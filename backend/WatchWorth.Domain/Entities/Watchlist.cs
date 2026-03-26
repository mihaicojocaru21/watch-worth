namespace WatchWorth.Domain.Entities
{
    public class Watchlist
    {
        public int  Id     { get; set; }
        public int  UserId { get; set; }

        // Navigation
        public User                    User  { get; set; } = null!;
        public ICollection<WatchlistItem> Items { get; set; } = [];
    }
}