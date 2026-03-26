using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Repositories
{
    public class EfUserRepository : IUserRepository
    {
        private readonly WatchWorthDbContext _ctx;

        public EfUserRepository(WatchWorthDbContext ctx)
        {
            _ctx = ctx;
        }

        public User? GetByEmailAndPassword(string email, string password) =>
            _ctx.Users.FirstOrDefault(u => u.Email == email && u.Password == password);

        public User? GetById(int id) =>
            _ctx.Users.Find(id);
    }
}