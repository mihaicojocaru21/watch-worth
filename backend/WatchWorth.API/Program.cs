using WatchWorth.API.Services;
using WatchWorth.DataAccessLayer;
using WatchWorth.DataAccessLayer.Context;

var builder = WebApplication.CreateBuilder(args);

// ── eBookStore pattern: set connection string once, statically ──
DbSession.ConnectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Data Source=watchworth.db";

// ── Services ──────────────────────────────────────────────────
builder.Services.AddControllers();
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
    db.Database.EnsureCreated();
}

// ── Middleware ────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();