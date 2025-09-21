using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateDiaryDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = null!;
}
