var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Middleware
if (app.Environment.IsDevelopment()) { }

// Remove it later if not needed
// app.UseAuthorization();

app.MapControllers();

app.Run();
