using WatchWorth.BusinessLayer.Core;
using WatchWorth.BusinessLayer.Interfaces;

namespace WatchWorth.BusinessLayer.Structure
{
    public class WatchlistExecution : WatchlistActions, IWatchlistAction
    {
        public List<int> GetMovieIdsAction(int userId)
            => GetMovieIdsActionExecution(userId);

        public void AddMovieAction(int userId, int movieId)
            => AddMovieActionExecution(userId, movieId);

        public void RemoveMovieAction(int userId, int movieId)
            => RemoveMovieActionExecution(userId, movieId);

        public void ClearWatchlistAction(int userId)
            => ClearWatchlistActionExecution(userId);
    }
}