using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.BusinessLayer.Services;
using WatchWorth.BusinessLayer.Structure;

namespace WatchWorth.BusinessLayer
{
    public class BusinessLogic
    {
        public BusinessLogic() { }

        public IMovieAction MovieAction()
            => new MovieExecution();

        public IReviewAction ReviewAction()
            => new ReviewExecution();

        public IUserAction UserAction()
            => new UserExecution();

        public IWatchlistAction WatchlistAction()
            => new WatchlistExecution();

        public IJwtService JwtService(string secret)
            => new JwtService(secret);
    }
}