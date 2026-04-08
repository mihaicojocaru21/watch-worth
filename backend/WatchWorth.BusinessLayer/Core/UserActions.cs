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
    }
}