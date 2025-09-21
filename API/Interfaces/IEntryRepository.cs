using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IEntryRepository
{
    Task<Entry> CreateEntryAsync(int diaryId, Entry entry, string userId);
    Task<IEnumerable<Entry>> GetDiaryEntriesAsync(int diaryId, string userId);
    Task<Entry?> GetEntryByIdAsync(int entryId, string userId);
    Task<bool> UpdateEntryAsync(int id, Entry entry, string userId);
    Task<bool> DeleteEntryAsync(int id, string userId);
}
