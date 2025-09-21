using System;

namespace API.DTOs;

public class EntryDto
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? MediaUrls { get; set; } = string.Empty;
    public int DiaryId { get; set; }
}
