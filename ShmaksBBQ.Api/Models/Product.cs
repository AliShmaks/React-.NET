using Microsoft.EntityFrameworkCore;

namespace ShmaksBBQ.Api.Models;

public class Product
{
    public int Id { get; set; }

    public int CategoryId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Precision(10, 2)]
    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }

    public int DisplayOrder { get; set; }

    public bool Bestseller { get; set; }

    public bool IsSpicy { get; set; }
    public bool HasFries { get; set; }

    public bool IsAvailable { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Category? Category { get; set; }
}