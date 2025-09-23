using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateEntryDto
{
    [Required]
    public string Content { get; set; } = "";
    public string? MediaUrls { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
