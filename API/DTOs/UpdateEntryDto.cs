using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateEntryDto
{
    [Required]
    public string Content { get; set; } = null!;
}
