using AutoMapper;
using EcoFashionBackEnd.Common;
using EcoFashionBackEnd.Common.Payloads.Requests;
using EcoFashionBackEnd.Common.Payloads.Responses;
using EcoFashionBackEnd.Dtos;
using EcoFashionBackEnd.Entities;
using EcoFashionBackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EcoFashionBackEnd.Controllers;
[Route("api/Order")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;
    private readonly IMapper _mapper;
    public OrderController(OrderService orderService, IMapper mapper)
    {
        _orderService = orderService;
        _mapper = mapper;
    }
    [HttpGet("GetAll")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrdersAsync();
        return Ok(ApiResult<IEnumerable<OrderModel>>.Succeed(orders));
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id);
        if (order == null)
            return NotFound(ApiResult<object>.Fail("Không tìm thấy Order"));
        return Ok(ApiResult<OrderModel>.Succeed(order));
    }
    [HttpPost("Create")]
    public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
            return Unauthorized(ApiResult<CreateDesignResponse>.Fail("Không thể xác định người dùng."));
        var orderId = await _orderService.CreateOrderAsync(userId, request);
        return CreatedAtAction(nameof(GetOrderById), new { id = orderId },
            ApiResult<object>.Succeed(new {OrderId = orderId}));
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromForm] UpdateOrderRequest request)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
            return Unauthorized(ApiResult<CreateDesignResponse>.Fail("Không thể xác định người dùng."));
        var updateSuccess = await _orderService.UpdateOrderAsync(id, request);
        if (updateSuccess)
            return Ok(ApiResult<object>.Succeed("Order đã được cập nhật"));
        return BadRequest("Cập nhật Order thất bại");
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeteleOrder(int id)
    {
        if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int userId))
            return Unauthorized(ApiResult<CreateDesignResponse>.Fail("Không thể xác định người dùng."));
        var result = await _orderService.DeleteOrderAsync(id);
        if (result) return Ok(ApiResult<object>.Succeed($"Order id: {id} đã được xóa"));
        return BadRequest("Xóa Order thất bại");
    }
    [HttpGet("Order-Statuses")]
    public IActionResult GetOrderStatuses()
    {
        var statuses = Enum.GetValues(typeof(OrderStatus))
            .Cast<OrderStatus>()
            .Select(s => new { Value = s, Label = s.ToString() });

        return Ok(statuses);
    }
}