using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Models.Auth;

namespace WatchWorth.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserAction _users;
        private readonly IJwtService _jwt;

        private const string RefreshTokenCookie = "watchworth_refresh";
        private static readonly TimeSpan RefreshTokenLifetime = TimeSpan.FromDays(30);

        public AuthController(IJwtService jwt)
        {
            var bl = new BusinessLogic();
            _users = bl.UserAction();
            _jwt   = jwt;
        }

        // ── POST api/auth/login ───────────────────────────────────────────────
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _users.GetByEmailAndPasswordAction(dto.Email, dto.Password);
            if (user is null)
                return Unauthorized(new { message = "Invalid email or password." });

            return Ok(IssueTokenPair(user));
        }

        // ── POST api/auth/register ────────────────────────────────────────────
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest dto)
        {
            var (user, error) = _users.RegisterUserAction(dto.Username, dto.Email, dto.Password);
            if (user is null)
                return Conflict(new { message = error });

            return Ok(IssueTokenPair(user));
        }

        // ── POST api/auth/refresh ─────────────────────────────────────────────
        [HttpPost("refresh")]
        public IActionResult Refresh()
        {
            var oldToken = Request.Cookies[RefreshTokenCookie];
            if (string.IsNullOrEmpty(oldToken))
                return Unauthorized(new { message = "Refresh token missing." });

            var stored = _users.GetValidRefreshToken(oldToken);
            if (stored is null)
                return Unauthorized(new { message = "Refresh token invalid or expired." });

            var user = _users.GetUserByIdAction(stored.UserId);
            if (user is null)
                return Unauthorized(new { message = "User not found." });

            // Token rotation — revoke old, issue new
            _users.RevokeRefreshToken(oldToken);
            return Ok(IssueTokenPair(user));
        }

        // ── POST api/auth/logout ──────────────────────────────────────────────
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            var token = Request.Cookies[RefreshTokenCookie];
            if (!string.IsNullOrEmpty(token))
                _users.RevokeRefreshToken(token);

            Response.Cookies.Delete(RefreshTokenCookie, new CookieOptions
            {
                Path     = "/",
                SameSite = SameSiteMode.Lax,
            });

            return NoContent();
        }

        // ── Helper: issue access token + set refresh cookie ───────────────────
        private object IssueTokenPair(WatchWorth.Domain.Entities.User user)
        {
            var accessToken  = _jwt.GenerateToken(user);
            var refreshToken = _jwt.GenerateRefreshToken();
            var expiresAt    = DateTime.UtcNow.Add(RefreshTokenLifetime);

            _users.StoreRefreshToken(user.Id, refreshToken, expiresAt);

            Response.Cookies.Append(RefreshTokenCookie, refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure   = false,          // set true in production (HTTPS)
                SameSite = SameSiteMode.Lax,
                Expires  = expiresAt,
                Path     = "/",
            });

            return new
            {
                token = accessToken,
                user  = new SafeUser
                {
                    Id       = user.Id,
                    Username = user.Username,
                    Email    = user.Email,
                    Role     = user.Role,
                },
            };
        }
    }
}
