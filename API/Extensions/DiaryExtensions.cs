using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class DiaryExtensions
{
    public static DiaryDto ToDto(this Diary diary)
    {
        return new DiaryDto
        {
            Id = diary.Id,
            Title = diary.Title,
            IsPublic = diary.IsPublic,
            CreatedAt = diary.CreatedAt,
            UpdatedAt = diary.UpdatedAt,
            UserId = diary.AppUserId,
            UserName = diary.AppUser?.UserName,
            DisplayName = diary.AppUser?.DisplayName,
            Entries = diary.Entries?.Select(e => new EntryDto
            {
                Id = e.Id,
                Content = e.Content,
                CreatedAt = e.CreatedAt,
                UpdatedAt = e.UpdatedAt,
                DiaryId = e.DiaryId,
                MediaUrls = e.MediaUrls
            }).ToList() ?? []
        };
    }
}
