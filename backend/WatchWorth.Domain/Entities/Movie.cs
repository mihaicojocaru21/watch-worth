namespace WatchWorth.Domain.Entities
{
    public class Movie
    {
        public int    Id          { get; set; }
        public int    TmdbId      { get; set; }
        public string Title       { get; set; } = "";
        public int    Year        { get; set; }
        public string Description { get; set; } = "";
        public double Rating      { get; set; }
        public string Image       { get; set; } = "";
        public string Genre       { get; set; } = "";
    }
}