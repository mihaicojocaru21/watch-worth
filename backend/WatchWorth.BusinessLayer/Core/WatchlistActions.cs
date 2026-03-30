using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.BusinessLayer.Core
{
    public class WatchlistActions
    {
        protected WatchlistActions() { }

        protected List<int> GetMovieIdsActionExecution(int userId)
        {
            using (var db = new WatchWorthDbContext())
            {
                var watchlist = db.Watchlists.FirstOrDefault(w => w.UserId == userId);
                if (watchlist is null) return [];

                return db.WatchlistItems
                    .Where(i => i.WatchlistId == watchlist.Id)
                    .Select(i => i.MovieId)
                    .ToList();
            }
        }

        protected void AddMovieActionExecution(int userId, int movieId)
        {
            using (var db = new WatchWorthDbContext())
            {
                var watchlist = db.Watchlists.FirstOrDefault(w => w.UserId == userId);

                if (watchlist is null)
                {
                    watchlist = new Watchlist { UserId = userId };
                    db.Watchlists.Add(watchlist);
                    db.SaveChanges();
                }

                var alreadyAdded = db.WatchlistItems
                    .Any(i => i.WatchlistId == watchlist.Id && i.MovieId == movieId);

                if (!alreadyAdded)
                {
                    db.WatchlistItems.Add(new WatchlistItem
                    {
                        WatchlistId = watchlist.Id,
                        MovieId     = movieId,
                    });
                    db.SaveChanges();
                }
            }
        }

        protected void RemoveMovieActionExecution(int userId, int movieId)
        {
            using (var db = new WatchWorthDbContext())
            {
                var watchlist = db.Watchlists.FirstOrDefault(w => w.UserId == userId);
                if (watchlist is null) return;

                var item = db.WatchlistItems
                    .FirstOrDefault(i => i.WatchlistId == watchlist.Id && i.MovieId == movieId);

                if (item is null) return;

                db.WatchlistItems.Remove(item);
                db.SaveChanges();
            }
        }

        protected void ClearWatchlistActionExecution(int userId)
        {
            using (var db = new WatchWorthDbContext())
            {
                var watchlist = db.Watchlists.FirstOrDefault(w => w.UserId == userId);
                if (watchlist is null) return;

                var items = db.WatchlistItems
                    .Where(i => i.WatchlistId == watchlist.Id)
                    .ToList();

                db.WatchlistItems.RemoveRange(items);
                db.SaveChanges();
            }
        }
    }
}