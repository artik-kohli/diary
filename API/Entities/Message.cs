using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Message
{
    public int Id { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;

    // Foreign keys
    public required string SenderId { get; set; }
    public required string RecipientId { get; set; }

    // Navigation properties
    public AppUser Sender { get; set; } = null!;
    public AppUser Recipient { get; set; } = null!;
}
