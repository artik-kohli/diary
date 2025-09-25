using System;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IEntryRepository
{
    Task<Entry> CreateEntryAsync(int diaryId, Entry entry, string userId);
    Task<IEnumerable<Entry>> GetDiaryEntriesAsync(int diaryId, string userId);
    Task<IEnumerable<Entry>> GetPublicDiaryEntriesAsync(int diaryId);
    Task<Entry?> GetEntryByIdAsync(int entryId, string userId);
    Task<Entry?> GetPublicEntryByIdAsync(int entryId);
    Task<bool> UpdateEntryAsync(int id, Entry entry, string userId);
    Task<bool> DeleteEntryAsync(int id, string userId);
}
