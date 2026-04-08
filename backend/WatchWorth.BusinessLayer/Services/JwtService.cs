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
    private readonly string _issuer;
    private readonly string _audience;

    public JwtService(string secret, string issuer, string audience)
    {
        if (string.IsNullOrWhiteSpace(secret))
            throw new ArgumentException("JWT secret must not be empty.", nameof(secret));

        _key      = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        _issuer   = issuer;
        _audience = audience;
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
            issuer:             _issuer,
            audience:           _audience,
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
                ValidateIssuer           = true,
                ValidIssuer              = _issuer,
                ValidateAudience         = true,
                ValidAudience            = _audience,
                ClockSkew                = TimeSpan.Zero,
            }, out _);
        }
        catch
        {
            return null;
        }
    }
}
