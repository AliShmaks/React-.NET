using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShmaksBBQ.Api.Data;
using ShmaksBBQ.Api.DTOs;
using ShmaksBBQ.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShmaksBBQ.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly PasswordHasher<User> _passwordHasher = new();

    public AuthController(
        AppDbContext context,
        IConfiguration configuration
    )
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var email = request.Email.Trim().ToLower();

        var user = await _context.Users
            .FirstOrDefaultAsync(user => user.Email.ToLower() == email);

        if (user is null || !user.IsActive)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var passwordResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            request.Password
        );

        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var token = CreateToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Role
            }
        });
    }



[HttpPost("register")]
public async Task<IActionResult> Register(RegisterRequest request)
{
    var fullName = request.FullName.Trim();
    var email = request.Email.Trim().ToLower();
    var password = request.Password;

    if (string.IsNullOrWhiteSpace(fullName))
    {
        return BadRequest(new
        {
            message = "Full name is required."
        });
    }

    if (string.IsNullOrWhiteSpace(email))
    {
        return BadRequest(new
        {
            message = "Email is required."
        });
    }

    if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
    {
        return BadRequest(new
        {
            message = "Password must be at least 6 characters."
        });
    }

    var emailExists = await _context.Users.AnyAsync(
        user => user.Email.ToLower() == email
    );

    if (emailExists)
    {
        return Conflict(new
        {
            message = "An account with this email already exists."
        });
    }

    var user = new User
    {
        FullName = fullName,
        Email = email,
        Role = "Customer",
        IsActive = true
    };

    user.PasswordHash = _passwordHasher.HashPassword(
        user,
        password
    );

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return StatusCode(201, new
    {
        message = "Account created successfully.",
        user = new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role
        }
    });
}


    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var idValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(idValue, out var userId))
        {
            return Unauthorized();
        }

        var user = await _context.Users.FindAsync(userId);

        if (user is null || !user.IsActive)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.Role
        });
    }

    private string CreateToken(User user)
    {
        var jwtSection = _configuration.GetSection("Jwt");

        var key = jwtSection["Key"]
            ?? throw new InvalidOperationException("JWT key is missing.");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role)
        };

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256
        );

        var expiresMinutes = int.TryParse(
            jwtSection["ExpiresMinutes"],
            out var minutes
        )
            ? minutes
            : 120;

        var token = new JwtSecurityToken(
            issuer: jwtSection["Issuer"],
            audience: jwtSection["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiresMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}