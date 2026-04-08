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

        public AuthController(IJwtService jwt)
        {
            var bl = new BusinessLogic();
            _users = bl.UserAction();
            _jwt   = jwt;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _users.GetByEmailAndPasswordAction(dto.Email, dto.Password);
            if (user is null)
                return Unauthorized(new { message = "Invalid email or password." });

            var token    = _jwt.GenerateToken(user);
            var safeUser = new SafeUser
            {
                Id       = user.Id,
                Username = user.Username,
                Email    = user.Email,
                Role     = user.Role,
            };

            return Ok(new { token, user = safeUser });
        }

        // POST api/auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest dto)
        {
            var (user, error) = _users.RegisterUserAction(dto.Username, dto.Email, dto.Password);
            if (user is null)
                return Conflict(new { message = error });

            var token    = _jwt.GenerateToken(user);
            var safeUser = new SafeUser
            {
                Id       = user.Id,
                Username = user.Username,
                Email    = user.Email,
                Role     = user.Role,
            };

            return Ok(new { token, user = safeUser });
        }
    }
}
