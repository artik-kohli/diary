using System;

namespace API.Entities;

public class SharedDiary
{
    public int Id { get; set; }
    public DateTime SharedAt { get; set; } = DateTime.UtcNow;
    public bool CanEdit { get; set; } = false;

    // Foreign keys
    public int DiaryId { get; set; }
    public required string SharedWithUserId { get; set; }
    public required string SharedById { get; set; }

    // Navigation properties
    public Diary Diary { get; set; } = null!;
    public AppUser SharedWithUser { get; set; } = null!;
    public AppUser SharedBy { get; set; } = null!;
}
