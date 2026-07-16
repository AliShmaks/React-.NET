using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShmaksBBQ.Api.Data;
using ShmaksBBQ.Api.Models;

namespace ShmaksBBQ.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]

public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }


    [AllowAnonymous]

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = await _context.Products
            .Include(product => product.Category)
            .OrderBy(product => product.Name)
            .ToListAsync();

        return Ok(products);
    }
[AllowAnonymous]

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(item => item.Category)
            .FirstOrDefaultAsync(item => item.Id == id);

        if (product is null)
        {
            return NotFound(new { message = "Product not found." });
        }

        return Ok(product);
    }
[AllowAnonymous]

    [HttpGet("category/{categoryId:int}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetByCategory(
        int categoryId
    )
    {
        var products = await _context.Products
            .Where(product => product.CategoryId == categoryId)
            .OrderBy(product => product.Name)
            .ToListAsync();

        return Ok(products);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        var categoryExists = await _context.Categories
            .AnyAsync(category => category.Id == product.CategoryId);

        if (!categoryExists)
        {
            return BadRequest(new
            {
                message = "The selected category does not exist."
            });
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.Id },
            product
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(
        int id,
        Product product
    )
    {
        if (id != product.Id)
        {
            return BadRequest(new
            {
                message = "The product ID does not match."
            });
        }

        var existingProduct = await _context.Products.FindAsync(id);

        if (existingProduct is null)
        {
            return NotFound(new { message = "Product not found." });
        }

        var categoryExists = await _context.Categories
            .AnyAsync(category => category.Id == product.CategoryId);

        if (!categoryExists)
        {
            return BadRequest(new
            {
                message = "The selected category does not exist."
            });
        }

        existingProduct.CategoryId = product.CategoryId;
        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Price = product.Price;
        existingProduct.ImageUrl = product.ImageUrl;
        existingProduct.HasFries = product.HasFries;
        existingProduct.DisplayOrder = product.DisplayOrder;
        existingProduct.Bestseller = product.Bestseller;
        existingProduct.IsSpicy = product.IsSpicy;
        existingProduct.IsAvailable = product.IsAvailable;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product is null)
        {
            return NotFound(new { message = "Product not found." });
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}