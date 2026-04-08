using System.Security.Claims;
using WatchWorth.API.Models;

namespace WatchWorth.API.Extensions;

public static class ClaimsExtensions
{
    public static SafeUser GetCurrentUser(this ClaimsPrincipal principal) => new()
    {
        Id       = int.Parse(principal.FindFirstValue("id")       ?? "0"),
        Username = principal.FindFirstValue("username")            ?? "",
        Email    = principal.FindFirstValue("email")               ?? "",
        Role     = principal.FindFirstValue("role")                ?? "user",
    };
}
