namespace WatchWorth.Domain.Entities
{
    public class WatchlistItem
    {
        public int WatchlistId { get; set; }
        public int MovieId     { get; set; }

        // Navigation
        public Watchlist Watchlist { get; set; } = null!;
        public Movie     Movie     { get; set; } = null!;
    }
}