using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateDiaryDto
{
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = "My Diary";
    public bool IsPublic { get; set; } = false;
}
