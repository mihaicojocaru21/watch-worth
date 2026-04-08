using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Core
{
    public class UserActions
    {
        protected UserActions() { }

        protected User? GetByEmailAndPasswordActionExecution(string email, string password)
        {
            using var db = new WatchWorthDbContext();
            var user = db.Users.FirstOrDefault(u => u.Email == email);
            if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null;
            return user;
        }

        protected User? GetUserByIdActionExecution(int id)
        {
            using var db = new WatchWorthDbContext();
            return db.Users.Find(id);
        }

        protected (User? user, string? error) RegisterUserActionExecution(string username, string email, string password)
        {
            using var db = new WatchWorthDbContext();

            if (db.Users.Any(u => u.Email == email))
                return (null, "Email is already in use.");

            var user = new User
            {
                Username = username,
                Email    = email,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Role     = "user",
            };

            db.Users.Add(user);
            db.SaveChanges();
            return (user, null);
        }

        // ── Refresh token CRUD ────────────────────────────────────────────────

        protected void StoreRefreshTokenExecution(int userId, string token, DateTime expiresAt)
        {
            using var db = new WatchWorthDbContext();
            db.RefreshTokens.Add(new RefreshToken
            {
                Token     = token,
                UserId    = userId,
                ExpiresAt = expiresAt,
                CreatedAt = DateTime.UtcNow,
            });
            db.SaveChanges();
        }

        protected RefreshToken? GetValidRefreshTokenExecution(string token)
        {
            using var db = new WatchWorthDbContext();
            var rt = db.RefreshTokens
                       .FirstOrDefault(r => r.Token == token);
            if (rt is null || rt.IsExpired) return null;
            return rt;
        }

        protected void RevokeRefreshTokenExecution(string token)
        {
            using var db = new WatchWorthDbContext();
            var rt = db.RefreshTokens.FirstOrDefault(r => r.Token == token);
            if (rt is not null)
            {
                db.RefreshTokens.Remove(rt);
                db.SaveChanges();
            }
        }

        protected void RevokeAllUserRefreshTokensExecution(int userId)
        {
            using var db = new WatchWorthDbContext();
            var tokens = db.RefreshTokens.Where(r => r.UserId == userId).ToList();
            if (tokens.Count > 0)
            {
                db.RefreshTokens.RemoveRange(tokens);
                db.SaveChanges();
            }
        }
    }
}