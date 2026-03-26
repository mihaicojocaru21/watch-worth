namespace WatchWorth.Domain.Entities
{
    public class Review
    {
        public string Id        { get; set; } = "";
        public int    MovieId   { get; set; }
        public int    UserId    { get; set; }
        public string Username  { get; set; } = "";
        public int    Rating    { get; set; }
        public string Text      { get; set; } = "";
        public string CreatedAt { get; set; } = "";

        // Navigation
        public Movie Movie { get; set; } = null!;
        public User  User  { get; set; } = null!;
    }
}