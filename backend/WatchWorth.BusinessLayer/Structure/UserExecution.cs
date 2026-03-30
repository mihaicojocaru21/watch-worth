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
    }
}