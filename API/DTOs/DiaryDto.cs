using System;

namespace API.DTOs;

public class DiaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<EntryDto> Entries { get; set; } = [];
}
