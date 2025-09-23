using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateMemoDto
{
    public string? Title { get; set; }

    [Required]
    public string Content { get; set; } = null!;
    public string? MediaUrls { get; set; }
    public DateTime? CreatedAt { get; set; }
    public bool? IsPublic { get; set; }
}
