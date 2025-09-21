using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class EntryRepository(
    DataContext context
) : IEntryRepository
{
    public async Task<Entry> CreateEntryAsync(int diaryId, Entry entry, string userId)
    {
        // Verify that the diary exists and belongs to the user
        var diary = await context.Diaries
            .FirstOrDefaultAsync(d => d.Id == diaryId && d.AppUserId == userId);

        if (diary == null) return null!;

        context.Entries.Add(entry);

        diary.UpdatedAt = DateTime.UtcNow;
        context.Diaries.Update(diary);

        await context.SaveChangesAsync();

        return entry;
    }

    public async Task<bool> DeleteEntryAsync(int id, string userId)
    {
        var entry = await context.Entries
            .Include(e => e.Diary)
            .FirstOrDefaultAsync(e => e.Id == id && e.Diary.AppUserId == userId);

        if (entry == null) return false;

        context.Entries.Remove(entry);

        entry.Diary.UpdatedAt = DateTime.UtcNow;
        context.Diaries.Update(entry.Diary);

        return await context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<Entry>> GetDiaryEntriesAsync(int diaryId, string userId)
    {
        // Verify that the diary exists and belongs to the user
        var diary = await context.Diaries
            .FirstOrDefaultAsync(d => d.Id == diaryId && d.AppUserId == userId);

        if (diary == null) return null!;

        return await context.Entries
            .Where(e => e.DiaryId == diaryId)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();
    }

    public async Task<Entry?> GetEntryByIdAsync(int entryId, string userId)
    {
        var entry = await context.Entries
            .Include(e => e.Diary)
            .FirstOrDefaultAsync(e => e.Id == entryId && e.Diary.AppUserId == userId);

        if (entry == null) return null!;

        return entry;
    }

    public async Task<bool> UpdateEntryAsync(int id, Entry updatedEntry, string userId)
    {
        var entry = await context.Entries
            .Include(e => e.Diary)
            .FirstOrDefaultAsync(e => e.Id == id && e.Diary.AppUserId == userId);

        if (entry == null) return false;

        entry.Content = updatedEntry.Content;
        entry.UpdatedAt = DateTime.UtcNow;

        context.Entries.Update(entry);

        // Update diary's updatedAt timestamp
        entry.Diary.UpdatedAt = DateTime.UtcNow;
        context.Diaries.Update(entry.Diary);

        return await context.SaveChangesAsync() > 0;
    }
}
