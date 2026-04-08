using WatchWorth.BusinessLayer.Core;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Structure
{
    public class UserExecution : UserActions, IUserAction
    {
        public User? GetByEmailAndPasswordAction(string email, string password)
            => GetByEmailAndPasswordActionExecution(email, password);

        public User? GetUserByIdAction(int id)
            => GetUserByIdActionExecution(id);

        public (User? user, string? error) RegisterUserAction(string username, string email, string password)
            => RegisterUserActionExecution(username, email, password);

        public void StoreRefreshToken(int userId, string token, DateTime expiresAt)
            => StoreRefreshTokenExecution(userId, token, expiresAt);

        public RefreshToken? GetValidRefreshToken(string token)
            => GetValidRefreshTokenExecution(token);

        public void RevokeRefreshToken(string token)
            => RevokeRefreshTokenExecution(token);

        public void RevokeAllUserRefreshTokens(int userId)
            => RevokeAllUserRefreshTokensExecution(userId);
    }
}