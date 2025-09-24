using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    ITokenService tokenService
) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        // Check if the user already exists
        if (await userManager.FindByEmailAsync(registerDto.Email) != null)
            return BadRequest("Email is already taken");

        if (await userManager.FindByNameAsync(registerDto.Username) != null)
            return BadRequest("Username is already taken");

        var user = new AppUser
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName
        };

        var result = await userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        // Generate JWT token
        var token = await tokenService.GenerateToken(user);

        return new UserDto
        {
            UserName = user.UserName,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = token
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        AppUser? user = null;

        if (loginDto.Username.Contains('@'))
        {
            user = await userManager.FindByEmailAsync(loginDto.Username);
        }

        user ??= await userManager.FindByNameAsync(loginDto.Username);

        if (user == null) return Unauthorized("Invalid username/email or password");

        var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized("Invalid username or password");

        // Generate JWT token
        var token = await tokenService.GenerateToken(user);

        return new UserDto
        {
            UserName = user.UserName!,
            Email = user.Email!,
            DisplayName = user.DisplayName!,
            Token = token
        };
    }

    [Authorize]
    [HttpPost("logout")]
    public ActionResult Logout()
    {
        // await signInManager.SignOutAsync();
        return Ok();
    }
}
