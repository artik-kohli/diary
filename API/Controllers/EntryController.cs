using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class EntryController(
    IDiaryRepository diaryRepository,
    IEntryRepository entryRepository
) : BaseApiController
{
    [HttpGet("{diaryId}")]
    public async Task<ActionResult<IEnumerable<EntryDto>>> GetEntries(int diaryId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Verify the diary belongs to the user
        var diary = await diaryRepository.GetDiaryByIdAsync(diaryId, userId!);

        if (diary == null) return NotFound("Diary not found");

        var entries = await entryRepository.GetDiaryEntriesAsync(diaryId, userId!);

        return Ok(entries.Select(e => e.ToDto()));
    }

    [HttpGet("public/{diaryId}")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<EntryDto>>> GetPublicEntries(int diaryId)
    {
        var entries = await entryRepository.GetPublicDiaryEntriesAsync(diaryId);

        if (entries == null) return NotFound("Public diary not found");

        return Ok(entries.Select(e => e.ToDto()));
    }

    [HttpPost("{diaryId}")]
    public async Task<ActionResult<EntryDto>> CreateEntry(int diaryId, [FromBody] CreateEntryDto createEntryDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Verify the diary belongs to the user
        var diary = await diaryRepository.GetDiaryByIdAsync(diaryId, userId!);

        if (diary == null) return NotFound("Diary not found");

        var entry = new Entry
        {
            Content = createEntryDto.Content,
            DiaryId = diaryId,
            CreatedAt = createEntryDto.CreatedAt,
            UpdatedAt = DateTime.UtcNow,
            MediaUrls = createEntryDto.MediaUrls
        };

        await entryRepository.CreateEntryAsync(diaryId, entry, userId!);

        return CreatedAtAction(nameof(GetEntries), new { diaryId }, entry.ToDto());
    }

    [HttpPut("{entryId}")]
    public async Task<IActionResult> UpdateEntry(int entryId, [FromBody] UpdateEntryDto updateEntryDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var entry = await entryRepository.GetEntryByIdAsync(entryId, userId!);

        if (entry == null) return NotFound();

        entry.Content = updateEntryDto.Content;
        entry.CreatedAt = updateEntryDto.CreatedAt ?? entry.CreatedAt;
        entry.MediaUrls = updateEntryDto.MediaUrls;
        entry.UpdatedAt = DateTime.UtcNow;

        await entryRepository.UpdateEntryAsync(entryId, entry, userId!);

        // Update diary's updateAt timestamp
        entry.Diary.UpdatedAt = DateTime.UtcNow;
        await diaryRepository.UpdateDiaryAsync(entry.Diary.Id, entry.Diary, userId!);

        return NoContent();
    }

    [HttpDelete("{entryId}")]
    public async Task<IActionResult> DeleteEntry(int entryId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var entry = await entryRepository.GetEntryByIdAsync(entryId, userId!);

        if (entry == null) return NotFound();

        await entryRepository.DeleteEntryAsync(entryId, userId!);

        // Update diary's updatedAt timestamp
        entry.Diary.UpdatedAt = DateTime.UtcNow;
        await diaryRepository.UpdateDiaryAsync(entry.Diary.Id, entry.Diary, userId!);

        return NoContent();
    }
}
