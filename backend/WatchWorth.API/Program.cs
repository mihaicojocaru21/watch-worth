using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WatchWorth.BusinessLayer;
using WatchWorth.BusinessLayer.Interfaces;
using WatchWorth.DataAccessLayer;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.DataAccessLayer.SeedData;

var builder = WebApplication.CreateBuilder(args);

// ── eBookStore pattern: set connection string once, statically ──
var dbPath = Path.Combine(AppContext.BaseDirectory, "watchworth.db");
DbSession.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? $"Data Source={dbPath}";

// ── Authentication ──────────────────────────────────────────────
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer   = true,
            ValidIssuer      = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience    = builder.Configuration["Jwt:Audience"],
        };
    });

// ── Services ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// IJwtService este implementat în BusinessLayer — înregistrat aici pentru DI
builder.Services.AddSingleton<IJwtService>(
    new BusinessLogic().JwtService(
        builder.Configuration["Jwt:Secret"]!,
        builder.Configuration["Jwt:Issuer"]!,
        builder.Configuration["Jwt:Audience"]!));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());   // required for httpOnly cookie exchange
});

var app = builder.Build();

// ── Ensure DB exists (EnsureCreated handles schema) ──────────
using (var db = new WatchWorthDbContext())
{
    DatabaseSeeder.Seed(db);
}

// ── Middleware ────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();