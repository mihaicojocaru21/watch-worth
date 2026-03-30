using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;
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
        private readonly JwtService  _jwt;

        public AuthController(JwtService jwt)
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

            // JwtService expects SafeUser — map from User entity
            var safeUser = new SafeUser
            {
                Id       = user.Id,
                Username = user.Username,
                Email    = user.Email,
                Role     = user.Role,
            };

            var token = _jwt.GenerateToken(safeUser);
            return Ok(new { token, user = safeUser });
        }
    }
}