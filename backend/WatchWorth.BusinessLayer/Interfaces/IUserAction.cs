using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IUserAction
    {
        User? GetByEmailAndPasswordAction(string email, string password);
        User? GetUserByIdAction(int id);
    }
}