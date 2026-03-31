using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WatchWorth.API.Services;
using WatchWorth.DataAccessLayer;
using WatchWorth.DataAccessLayer.Context;
using WatchWorth.DataAccessLayer.SeedData;

var builder = WebApplication.CreateBuilder(args);

// ── eBookStore pattern: set connection string once, statically ──
DbSession.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=watchworth.db";

// ── Authentication ──────────────────────────────────────────────
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });

// ── Services ──────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JwtService uses DI because it reads config (Jwt:Secret)
builder.Services.AddSingleton<JwtService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
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