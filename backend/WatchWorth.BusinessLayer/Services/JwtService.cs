using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Services;

public class JwtService : IJwtService
{
    private readonly SymmetricSecurityKey _key;

    public JwtService(string secret)
    {
        if (string.IsNullOrWhiteSpace(secret))
            throw new ArgumentException("JWT secret must not be empty.", nameof(secret));

        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
    }

    // ── Generare token ────────────────────────────────────────────────────────
    public string GenerateToken(User user)
    {
        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("id",       user.Id.ToString()),
            new Claim("username", user.Username),
            new Claim("email",    user.Email),
            new Claim("role",     user.Role),
        };

        var token = new JwtSecurityToken(
            claims:             claims,
            expires:            DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // ── Validare token ────────────────────────────────────────────────────────
    public ClaimsPrincipal? ValidateToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();

        try
        {
            return handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey         = _key,
                ValidateIssuer           = false,
                ValidateAudience         = false,
                ClockSkew                = TimeSpan.Zero,
            }, out _);
        }
        catch
        {
            return null;
        }
    }
}
