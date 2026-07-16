using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ShmaksBBQ.Api.Controllers;

[ApiController]
[Route("api/images")]
[Authorize(Roles = "Admin")]
public class ImagesController : ControllerBase
{
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(
        IFormFile file,
        [FromQuery] string folder = "products")
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "No file selected." });
        }

        folder = folder.ToLower();

        if (folder != "products" && folder != "categories")
        {
            folder = "products";
        }

        var uploadsFolder = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "uploads",
            folder
        );

        Directory.CreateDirectory(uploadsFolder);

        var extension = Path.GetExtension(file.FileName);
        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        var imageUrl =
            $"{Request.Scheme}://{Request.Host}/uploads/{folder}/{fileName}";

        return Ok(new
        {
            imageUrl
        });
    }
}