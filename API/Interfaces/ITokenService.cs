using System;
using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    Task<string> GenerateToken(AppUser user);
}
