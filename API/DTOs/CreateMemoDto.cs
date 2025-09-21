using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateMemoDto
{
    [Required]
    public string Content { get; set; } = "";
}
