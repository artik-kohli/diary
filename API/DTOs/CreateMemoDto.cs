using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateMemoDto
{
    [Required]
    public string Content { get; set; } = "";
    public string? Title { get; set; }
    public string? MediaUrls { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsPublic { get; set; } = false;
}
