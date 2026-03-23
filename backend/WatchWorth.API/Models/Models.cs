namespace WatchWorth.API.Models;

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

public class User
{
    public int    Id       { get; set; }
    public string Username { get; set; } = "";
    public string Email    { get; set; } = "";
    public string Role     { get; set; } = "user"; // "admin" | "user"
    public string Password { get; set; } = "";
}

public class Review
{
    public string Id        { get; set; } = "";
    public int    MovieId   { get; set; }
    public int    UserId    { get; set; }
    public string Username  { get; set; } = "";
    public int    Rating    { get; set; }
    public string Text      { get; set; } = "";
    public string CreatedAt { get; set; } = "";
}

public class Watchlist
{
    public int       UserId   { get; set; }
    public List<int> MovieIds { get; set; } = [];
}

// ── DTOs ──────────────────────────────────────────────────────────────────────

public class LoginRequest
{
    public string Email    { get; set; } = "";
    public string Password { get; set; } = "";
}

public class SafeUser
{
    public int    Id       { get; set; }
    public string Username { get; set; } = "";
    public string Email    { get; set; } = "";
    public string Role     { get; set; } = "";
}

public class LoginResponse
{
    public string   Token { get; set; } = "";
    public SafeUser User  { get; set; } = new();
}

public class CreateReviewRequest
{
    public int    Rating { get; set; }
    public string Text   { get; set; } = "";
}

public class UpdateReviewRequest
{
    public int?    Rating { get; set; }
    public string? Text   { get; set; }
}

public class CreateMovieRequest
{
    public int    TmdbId      { get; set; }
    public string Title       { get; set; } = "";
    public int    Year        { get; set; }
    public string Description { get; set; } = "";
    public double Rating      { get; set; }
    public string Image       { get; set; } = "";
    public string Genre       { get; set; } = "";
}