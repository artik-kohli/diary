using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Entry
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string? MediaUrls { get; set; }

    // Foreign keys
    public int DiaryId { get; set; }

    // Navigation properties
    public Diary Diary { get; set; } = null!;
}
