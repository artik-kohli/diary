using System;

namespace API.DTOs;

public class MemoDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsPublic { get; set; }
    public string? MediaUrls { get; set; }
}
