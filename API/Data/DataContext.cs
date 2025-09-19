using System;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Diary> Diaries { get; set; }
    public DbSet<Entry> Entries { get; set; }
    public DbSet<Memo> Memos { get; set; }
    public DbSet<SharedDiary> SharedDiaries { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // AppUser Relationships configuration
        builder.Entity<AppUser>()
            .HasMany(u => u.Diaries) // User has many Diaries
            .WithOne(d => d.AppUser) // Each Diary has one User
            .HasForeignKey(d => d.AppUserId) // Foreign key in Diary
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete Diaries when User is deleted

        builder.Entity<AppUser>()
            .HasMany(u => u.Memos) // User has many Memos
            .WithOne(m => m.AppUser) // Each Memo has one User
            .HasForeignKey(m => m.AppUserId) // Foreign key in Memo
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete Memos when User is deleted

        // Diary and Entry Relationships configuration
        builder.Entity<Diary>()
            .HasMany(d => d.Entries) // Diary has many Entries
            .WithOne(e => e.Diary) // Each Entry has one Diary
            .HasForeignKey(e => e.DiaryId) // Foreign key in Entry
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete Entries when Diary is deleted

        // SharedDiary Relationships configuration
        builder.Entity<SharedDiary>()
            .HasOne(sd => sd.Diary)
            .WithMany(d => d.SharedWithUsers)
            .HasForeignKey(sd => sd.DiaryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<SharedDiary>()
            .HasOne(sd => sd.SharedWithUser)
            .WithMany(u => u.SharedDiaries)
            .HasForeignKey(sd => sd.SharedWithUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<SharedDiary>()
            .HasOne(sd => sd.SharedBy)
            .WithMany()
            .HasForeignKey(sd => sd.SharedById)
            .OnDelete(DeleteBehavior.Restrict);

        // Message Relationships configuration
        builder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany(u => u.MessagesSent)
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
            .HasOne(m => m.Recipient)
            .WithMany(u => u.MessagesReceived)
            .HasForeignKey(m => m.RecipientId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
