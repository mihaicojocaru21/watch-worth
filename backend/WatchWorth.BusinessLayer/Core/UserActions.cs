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
                return db.Users.FirstOrDefault(u =>
                    u.Email == email && u.Password == password);
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