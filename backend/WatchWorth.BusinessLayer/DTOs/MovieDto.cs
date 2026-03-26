namespace WatchWorth.BusinessLayer.DTOs
{
    public class MovieDto
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

    public class CreateMovieDto
    {
        public int    TmdbId      { get; set; }
        public string Title       { get; set; } = "";
        public int    Year        { get; set; }
        public string Description { get; set; } = "";
        public double Rating      { get; set; }
        public string Image       { get; set; } = "";
        public string Genre       { get; set; } = "";
    }

    public class UpdateMovieDto
    {
        public int?    TmdbId      { get; set; }
        public string? Title       { get; set; }
        public int?    Year        { get; set; }
        public string? Description { get; set; }
        public double? Rating      { get; set; }
        public string? Image       { get; set; }
        public string? Genre       { get; set; }
    }
}