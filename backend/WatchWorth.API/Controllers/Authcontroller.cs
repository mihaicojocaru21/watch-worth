using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWorth.API.Models;
using WatchWorth.API.Services;

namespace WatchWorth.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(JsonDb db, JwtService jwt) : ControllerBase
{
    // POST /api/auth/login
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { error = "Email and password required" });

        var user = db.GetUsers()
            .FirstOrDefault(u => u.Email == req.Email && u.Password == req.Password);

        if (user is null)
            return Unauthorized(new { error = "Invalid email or password" });

        var safe  = new SafeUser { Id = user.Id, Username = user.Username, Email = user.Email, Role = user.Role };
        var token = jwt.GenerateToken(safe);

        return Ok(new LoginResponse { Token = token, User = safe });
    }

    // GET /api/auth/me
    [HttpGet("me")]
    [Authorize]
    public IActionResult Me() => Ok(new { user = User.GetCurrentUser() });
}