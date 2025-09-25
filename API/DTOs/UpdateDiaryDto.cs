using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateDiaryDto
{
    [MaxLength(100)]
    public string? Title { get; set; }
    public bool? IsPublic { get; set; }
}
