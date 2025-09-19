using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Memo
{
    public int Id { get; set; }

    public string? Title { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsPublic { get; set; } = false;
    public string? MediaUrls { get; set; }

    // Foreign keys
    public required string AppUserId { get; set; }

    // Navigation properties
    public AppUser AppUser { get; set; } = null!;
}
