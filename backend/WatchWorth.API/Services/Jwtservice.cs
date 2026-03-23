using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WatchWorth.API.Models;

namespace WatchWorth.API.Services;

public class JwtService(IConfiguration config)
{
    private readonly string _secret = config["Jwt:Secret"]
                                      ?? throw new InvalidOperationException("Jwt:Secret not configured");

    public string GenerateToken(SafeUser user)
    {
        var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("id",       user.Id.ToString()),
            new Claim("username", user.Username),
            new Claim("email",    user.Email),
            new Claim("role",     user.Role),
        };

        var token = new JwtSecurityToken(
            claims:   claims,
            expires:  DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// ── Helper extension to read claims from HttpContext ──────────────────────────
public static class ClaimsExtensions
{
    public static SafeUser GetCurrentUser(this ClaimsPrincipal principal) => new()
    {
        Id       = int.Parse(principal.FindFirstValue("id")       ?? "0"),
        Username = principal.FindFirstValue("username")            ?? "",
        Email    = principal.FindFirstValue("email")               ?? "",
        Role     = principal.FindFirstValue("role")                ?? "user",
    };
}