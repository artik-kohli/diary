using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateMemoDto
{
    public string? Title { get; set; }

    [Required]
    public string Content { get; set; } = null!;
}
