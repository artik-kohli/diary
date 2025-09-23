using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateEntryDto
{
    [Required]
    public string Content { get; set; } = null!;
    public string? MediaUrls { get; set; }
    public DateTime? CreatedAt { get; set; }
}
