using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class EntryExtensions
{
    public static EntryDto ToDto(this Entry entry)
    {
        return new EntryDto
        {
            Id = entry.Id,
            Content = entry.Content,
            CreatedAt = entry.CreatedAt,
            UpdatedAt = entry.UpdatedAt,
            MediaUrls = entry.MediaUrls,
            DiaryId = entry.DiaryId
        };
    }
}
