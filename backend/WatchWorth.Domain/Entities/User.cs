namespace WatchWorth.Domain.Entities
{
    public class User
    {
        public int    Id       { get; set; }
        public string Username { get; set; } = "";
        public string Email    { get; set; } = "";
        public string Role     { get; set; } = "user";
        public string Password { get; set; } = "";

        // Navigation
        public ICollection<Review>   Reviews   { get; set; } = [];
        public Watchlist?            Watchlist { get; set; }
    }
}