using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IUserAction
    {
        User? GetByEmailAndPasswordAction(string email, string password);
        User? GetUserByIdAction(int id);
        (User? user, string? error) RegisterUserAction(string username, string email, string password);

        // ── Refresh token CRUD ────────────────────────────────────────────────
        void           StoreRefreshToken(int userId, string token, DateTime expiresAt);
        RefreshToken?  GetValidRefreshToken(string token);
        void           RevokeRefreshToken(string token);
        void           RevokeAllUserRefreshTokens(int userId);
    }
}