namespace ShmaksBBQ.Api.Models;

public class Category
{
    public int Id { get; set; }

    public string CategoryKey { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;
}