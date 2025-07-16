using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

public class CreateDesignRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public float RecycledPercentage { get; set; }
    public string? CareInstructions { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public int ProductScore { get; set; }
    public string? Status { get; set; }
    public int? DesignTypeId { get; set; }
    [FromForm]
    public List<IFormFile> ImageFiles { get; set; } = new();
}