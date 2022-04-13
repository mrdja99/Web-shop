using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // POST: api/order
        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<ActionResult<Order>> AddOrder([FromBody] Order order)
        {
            if (await _orderService.AddOrder(order)) return Ok(order);
            return BadRequest();
        }

        // GET: api/order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();

            if (orders == null) return NotFound();

            return Ok(orders);
        }

        // PUT: api/order/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateOrder(int id, [FromBody] Order order)
        {
            if (await _orderService.UpdateOrder(id, order)) return Ok(order);
            return BadRequest();
        }

        // GET: api/order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersForUser(int id)
        {
            var orders = await _orderService.GetAllOrdersForUser(id);

            if (orders == null) return NotFound();

            return Ok(orders);
        }
    }
}