using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DiaryRepository(DataContext context) : IDiaryRepository
{
    public async Task<Diary> CreateDiaryAsync(Diary diary, string userId)
    {
        context.Diaries.Add(diary);
        await context.SaveChangesAsync();
        return diary;
    }

    public async Task<bool> DeleteDiaryAsync(int id, string userId)
    {
        var diary = await context.Diaries
            .FirstOrDefaultAsync(d => d.Id == id && d.AppUserId == userId);

        if (diary == null) return false;

        context.Diaries.Remove(diary);
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<Diary?> GetDiaryByIdAsync(int diaryId, string userId)
    {
        return await context.Diaries
            .Include(d => d.Entries)
            .FirstOrDefaultAsync(d => d.Id == diaryId && d.AppUserId == userId);
    }

    public Task<IEnumerable<Diary>> GetPublicDiariesAsync()
    {
        return Task.FromResult(context.Diaries
            .Where(d => d.IsPublic)
            .Include(d => d.Entries)
            .Include(d => d.AppUser)
            .AsEnumerable());
    }

    public async Task<Diary?> GetPublicDiaryByIdAsync(int diaryId)
    {
        return await context.Diaries
            .Include(d => d.Entries)
            .Include(d => d.AppUser)
            .FirstOrDefaultAsync(d => d.Id == diaryId && d.IsPublic);
    }

    public async Task<IEnumerable<Diary>> GetUserDiariesAsync(string userId)
    {
        return await context.Diaries
            .Where(d => d.AppUserId == userId)
            .Include(d => d.Entries)
            .ToListAsync();
    }

    public async Task<bool> UpdateDiaryAsync(int id, Diary updatedDiary, string userId)
    {
        var diary = await context.Diaries
            .FirstOrDefaultAsync(d => d.Id == id && d.AppUserId == userId);

        if (diary == null) return false;

        diary.Title = updatedDiary.Title;
        diary.UpdatedAt = DateTime.UtcNow;

        context.Diaries.Update(diary);
        return await context.SaveChangesAsync() > 0;
    }

    // private DiaryDto GetDiaryDto(Diary diary)
    // {
    //     return new DiaryDto
    //     {
    //         Id = diary.Id,
    //         Title = diary.Title,
    //         IsPublic = diary.IsPublic,
    //         CreatedAt = diary.CreatedAt,
    //         UpdatedAt = diary.UpdatedAt,
    //         Entries = diary.Entries?.Select(e => new EntryDto
    //         {
    //             Id = e.Id,
    //             Content = e.Content,
    //             CreatedAt = e.CreatedAt,
    //             UpdatedAt = e.UpdatedAt,
    //             MediaUrls = e.MediaUrls,
    //             DiaryId = e.DiaryId
    //         }).ToList() ?? []
    //     };
    // }
}
