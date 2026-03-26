using Microsoft.EntityFrameworkCore;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.Domain.Entities;

namespace WatchWorth.DataAccessLayer.Repositories
{
    public class EfWatchlistRepository : IWatchlistRepository
    {
        private readonly WatchWorthDbContext _ctx;

        public EfWatchlistRepository(WatchWorthDbContext ctx)
        {
            _ctx = ctx;
        }

        public List<int> GetMovieIds(int userId)
        {
            var watchlist = _ctx.Watchlists
                .Include(w => w.Items)
                .FirstOrDefault(w => w.UserId == userId);

            return watchlist?.Items.Select(i => i.MovieId).ToList() ?? [];
        }

        public void AddMovie(int userId, int movieId)
        {
            var watchlist = _ctx.Watchlists
                .Include(w => w.Items)
                .FirstOrDefault(w => w.UserId == userId);

            if (watchlist is null)
            {
                watchlist = new Watchlist { UserId = userId };
                _ctx.Watchlists.Add(watchlist);
                _ctx.SaveChanges();
            }

            if (!watchlist.Items.Any(i => i.MovieId == movieId))
            {
                _ctx.WatchlistItems.Add(new WatchlistItem
                {
                    WatchlistId = watchlist.Id,
                    MovieId     = movieId,
                });
                _ctx.SaveChanges();
            }
        }

        public void RemoveMovie(int userId, int movieId)
        {
            var watchlist = _ctx.Watchlists
                .Include(w => w.Items)
                .FirstOrDefault(w => w.UserId == userId);

            if (watchlist is null) return;

            var item = watchlist.Items.FirstOrDefault(i => i.MovieId == movieId);
            if (item is null) return;

            _ctx.WatchlistItems.Remove(item);
            _ctx.SaveChanges();
        }

        public void Clear(int userId)
        {
            var watchlist = _ctx.Watchlists
                .Include(w => w.Items)
                .FirstOrDefault(w => w.UserId == userId);

            if (watchlist is null) return;

            _ctx.WatchlistItems.RemoveRange(watchlist.Items);
            _ctx.SaveChanges();
        }
    }
}