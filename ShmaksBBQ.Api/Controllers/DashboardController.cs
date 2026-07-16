using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShmaksBBQ.Api.Data;

namespace ShmaksBBQ.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = new
        {
            categories = await _context.Categories.CountAsync(),
            products = await _context.Products.CountAsync(),
            bestsellers = await _context.Products.CountAsync(
                product => product.Bestseller
            ),
            spicy = await _context.Products.CountAsync(
                product => product.IsSpicy
            )
        };

        return Ok(stats);
    }

    [HttpGet("recent-products")]
    public async Task<IActionResult> GetRecentProducts(
        [FromQuery] int limit = 5
    )
    {
        if (limit < 1)
        {
            limit = 5;
        }

        if (limit > 50)
        {
            limit = 50;
        }

        var products = await _context.Products
            .Include(product => product.Category)
            .OrderByDescending(product => product.CreatedAt)
            .Take(limit)
            .ToListAsync();

        return Ok(products);
    }
}