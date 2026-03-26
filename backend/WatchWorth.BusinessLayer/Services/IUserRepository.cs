using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IUserRepository
    {
        User? GetByEmailAndPassword(string email, string password);
        User? GetById(int id);
    }
}