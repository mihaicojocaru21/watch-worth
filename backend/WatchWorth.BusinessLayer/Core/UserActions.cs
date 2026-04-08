using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Core
{
    public class UserActions
    {
        protected UserActions() { }

        protected User? GetByEmailAndPasswordActionExecution(string email, string password)
        {
            using (var db = new WatchWorthDbContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Email == email);
                if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
                    return null;
                return user;
            }
        }

        protected User? GetUserByIdActionExecution(int id)
        {
            using (var db = new WatchWorthDbContext())
            {
                return db.Users.Find(id);
            }
        }
    }
}