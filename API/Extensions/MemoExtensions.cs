using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class MemoExtensions
{
    public static MemoDto ToDto(this Memo memo)
    {
        return new MemoDto
        {
            Id = memo.Id,
            Title = memo.Title,
            Content = memo.Content,
            CreatedAt = memo.CreatedAt,
            UpdatedAt = memo.UpdatedAt,
            IsPublic = memo.IsPublic,
            MediaUrls = memo.MediaUrls
        };
    }
}
