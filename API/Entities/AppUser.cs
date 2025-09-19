using System;
using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public bool AllowChat { get; set; } = true;


    // Navigation properties
    public List<Diary> Diaries { get; set; } = [];
    public List<Memo> Memos { get; set; } = [];
    public List<Message> MessagesSent { get; set; } = [];
    public List<Message> MessagesReceived { get; set; } = [];
    public List<SharedDiary> SharedDiaries { get; set; } = [];
}
