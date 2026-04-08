namespace WatchWorth.API.Models;


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

public class RegisterRequest
{
    public string Username { get; set; } = "";
    public string Email    { get; set; } = "";
    public string Password { get; set; } = "";
}
