using System;
using API.Entities;

namespace API.Interfaces;

public interface IDiaryRepository
{
    Task<Diary> CreateDiaryAsync(Diary diary, string userId);
    Task<IEnumerable<Diary>> GetUserDiariesAsync(string userId);
    Task<IEnumerable<Diary>> GetPublicDiariesAsync();
    Task<Diary?> GetPublicDiaryByIdAsync(int diaryId);
    Task<Diary?> GetDiaryByIdAsync(int diaryId, string userId);
    Task<bool> UpdateDiaryAsync(int id, Diary diary, string userId);
    Task<bool> DeleteDiaryAsync(int id, string userId);
}
