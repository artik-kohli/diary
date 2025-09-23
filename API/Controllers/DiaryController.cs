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
public class DiaryController(
    IDiaryRepository diaryRepository
    // UserManager<AppUser> userManager
) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DiaryDto>>> GetDiaries()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var diaries = await diaryRepository.GetUserDiariesAsync(userId!);

        return Ok(diaries.Select(d => d.ToDto()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DiaryDto>> GetDiary(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var diary = await diaryRepository.GetDiaryByIdAsync(id, userId!);

        if (diary == null) return NotFound();

        return Ok(diary.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<DiaryDto>> CreateDiary([FromBody] CreateDiaryDto createDiaryDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var diary = new Diary
        {
            Title = createDiaryDto.Title,
            AppUserId = userId!,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsPublic = createDiaryDto.IsPublic
        };

        var createdDiary = await diaryRepository.CreateDiaryAsync(diary, userId!);

        return CreatedAtAction(nameof(GetDiary), new { id = createdDiary.Id }, createdDiary.ToDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDiary(int id, [FromBody] UpdateDiaryDto updateDiaryDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var diary = await diaryRepository.GetDiaryByIdAsync(id, userId!);

        if (diary == null) return NotFound();

        // TODO: Fix this and add unit of work pattern
        diary.Title = updateDiaryDto.Title;
        diary.IsPublic = updateDiaryDto.IsPublic;

        var result = await diaryRepository.UpdateDiaryAsync(id, diary, userId!);

        if (!result) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDiary(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var result = await diaryRepository.DeleteDiaryAsync(id, userId!);

        if (!result) return NotFound();

        return NoContent();
    }
}
