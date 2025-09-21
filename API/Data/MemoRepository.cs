using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemoRepository(DataContext context) : IMemoRepository
{
    public async Task<Memo> CreateMemoAsync(Memo memo, string userId)
    {
        context.Memos.Add(memo);
        await context.SaveChangesAsync();
        return memo;
    }

    public async Task<bool> DeleteMemoAsync(int id, string userId)
    {
        var memo = await context.Memos
            .FirstOrDefaultAsync(m => m.Id == id && m.AppUserId == userId);

        if (memo == null) return false;

        context.Memos.Remove(memo);
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<Memo?> GetMemoByIdAsync(int memoId, string userId)
    {
        return await context.Memos
            .FirstOrDefaultAsync(m => m.Id == memoId && m.AppUserId == userId);
    }

    public async Task<IEnumerable<Memo>> GetUserMemosAsync(string userId)
    {
        var memos = await context.Memos
            .Where(m => m.AppUserId == userId)
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
        return memos;
    }

    public async Task<bool> UpdateMemoAsync(int id, Memo updatedMemo, string userId)
    {
        var memo = await context.Memos
            .FirstOrDefaultAsync(m => m.Id == id && m.AppUserId == userId);

        if (memo == null) return false;

        memo.Content = updatedMemo.Content;
        memo.UpdatedAt = DateTime.UtcNow;

        context.Memos.Update(memo);
        return await context.SaveChangesAsync() > 0;
    }
}
