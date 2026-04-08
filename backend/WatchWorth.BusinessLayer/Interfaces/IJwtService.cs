using System.Security.Claims;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces;

public interface IJwtService
{
    /// <summary>Generează un JWT semnat pentru utilizatorul dat (expiră în 15 min).</summary>
    string GenerateToken(User user);

    /// <summary>Generează un refresh token opac (256-bit random, URL-safe base64).</summary>
    string GenerateRefreshToken();

    /// <summary>
    /// Validează un token JWT și returnează claims-urile dacă e valid,
    /// sau null dacă e expirat / invalid.
    /// </summary>
    ClaimsPrincipal? ValidateToken(string token);
}
