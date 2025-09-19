using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Diary
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = "My Diary";
    public bool IsPublic { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Foreign keys
    public required string AppUserId { get; set; }

    // Navigation properties
    public AppUser AppUser { get; set; } = null!;
    public List<Entry> Entries { get; set; } = [];
    public List<SharedDiary> SharedWithUsers { get; set; } = [];
}
