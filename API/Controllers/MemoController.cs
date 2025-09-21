using System;
using System.Security.Claims;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MemoController(
    IMemoRepository memoRepository
) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemoDto>>> GetMemos()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var memos = await memoRepository.GetUserMemosAsync(userId!);

        return Ok(memos.Select(m => m.ToDto()));
    }

    [HttpGet("{memoId}")]
    public async Task<ActionResult<MemoDto>> GetMemo(int memoId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var memo = await memoRepository.GetMemoByIdAsync(memoId, userId!);

        if (memo == null) return NotFound();

        return Ok(memo.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult> CreateMemo([FromBody] CreateMemoDto createMemoDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var memo = new Entities.Memo
        {
            Content = createMemoDto.Content,
            AppUserId = userId!,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var createdMemo = await memoRepository.CreateMemoAsync(memo, userId!);

        return CreatedAtAction(nameof(GetMemo), new { memoId = createdMemo.Id }, createdMemo.ToDto());
    }

    [HttpPut("{memoId}")]
    public async Task<ActionResult> UpdateMemo(int memoId, [FromBody] UpdateMemoDto updateMemoDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var memo = await memoRepository.GetMemoByIdAsync(memoId, userId!);

        if (memo == null) return NotFound();

        memo.Title = updateMemoDto.Title ?? memo.Title;
        memo.Content = updateMemoDto.Content;
        memo.UpdatedAt = DateTime.UtcNow;

        var result = await memoRepository.UpdateMemoAsync(memoId, memo, userId!);

        if (!result) return BadRequest("Failed to update memo");

        return NoContent();
    }

    [HttpDelete("{memoId}")]
    public async Task<ActionResult> DeleteMemo(int memoId)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var result = await memoRepository.DeleteMemoAsync(memoId, userId!);

        if (!result) return NotFound();

        return NoContent();
    }
}
