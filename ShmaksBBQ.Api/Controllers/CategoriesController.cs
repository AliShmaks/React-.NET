using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShmaksBBQ.Api.Data;
using ShmaksBBQ.Api.Models;

namespace ShmaksBBQ.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]

public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }
[AllowAnonymous]

    // GET: /api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        var categories = await _context.Categories
            .OrderBy(category => category.DisplayOrder)
            .ToListAsync();

        return Ok(categories);
    }

    // GET: /api/categories/4
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category is null)
        {
            return NotFound(new { message = "Category not found." });
        }

        return Ok(category);
    }

    // POST: /api/categories
    [HttpPost]
    public async Task<ActionResult<Category>> CreateCategory(
        Category category
    )
    {
        bool keyExists = await _context.Categories.AnyAsync(
            existing => existing.CategoryKey == category.CategoryKey
        );

        if (keyExists)
        {
            return Conflict(new
            {
                message = "A category with this key already exists."
            });
        }

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetCategory),
            new { id = category.Id },
            category
        );
    }

    // PUT: /api/categories/4
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCategory(
        int id,
        Category category
    )
    {
        if (id != category.Id)
        {
            return BadRequest(new
            {
                message = "The category ID does not match."
            });
        }

        var existingCategory = await _context.Categories.FindAsync(id);

        if (existingCategory is null)
        {
            return NotFound(new { message = "Category not found." });
        }

        bool duplicateKey = await _context.Categories.AnyAsync(
            existing =>
                existing.CategoryKey == category.CategoryKey &&
                existing.Id != id
        );

        if (duplicateKey)
        {
            return Conflict(new
            {
                message = "A category with this key already exists."
            });
        }

        existingCategory.CategoryKey = category.CategoryKey;
        existingCategory.Name = category.Name;
        existingCategory.ImageUrl = category.ImageUrl;
        existingCategory.DisplayOrder = category.DisplayOrder;
        existingCategory.IsActive = category.IsActive;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: /api/categories/4
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category is null)
        {
            return NotFound(new { message = "Category not found." });
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}