namespace WatchWorth.BusinessLayer.Interfaces
{
    public interface IWatchlistAction
    {
        List<int> GetMovieIdsAction(int userId);
        void      AddMovieAction(int userId, int movieId);
        void      RemoveMovieAction(int userId, int movieId);
        void      ClearWatchlistAction(int userId);
    }
}