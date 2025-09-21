using System;
using API.Entities;

namespace API.Interfaces;

public interface IMemoRepository
{
    Task<Memo> CreateMemoAsync(Memo memo, string userId);
    Task<IEnumerable<Memo>> GetUserMemosAsync(string userId);
    Task<Memo?> GetMemoByIdAsync(int memoId, string userId);
    Task<bool> UpdateMemoAsync(int id, Memo memo, string userId);
    Task<bool> DeleteMemoAsync(int id, string userId);
}
