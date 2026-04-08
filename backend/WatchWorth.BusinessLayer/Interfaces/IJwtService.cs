using System.Security.Claims;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces;

public interface IJwtService
{
    /// <summary>Generează un JWT semnat pentru utilizatorul dat.</summary>
    string GenerateToken(User user);

    /// <summary>
    /// Validează un token JWT și returnează claims-urile dacă e valid,
    /// sau null dacă e expirat / invalid.
    /// </summary>
    ClaimsPrincipal? ValidateToken(string token);
}
