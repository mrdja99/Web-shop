using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Service
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        public OrderService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<bool> AddOrder(Order order)
        {
            try
            {
                order.UserId = order.User.UserId;
                _context.Entry(order.User).State = EntityState.Unchanged;

                foreach (OrderItem item in order.OrderItems)
                {
                    item.ProductId = item.Product.ID;
                    _context.Entry(item.Product).State = EntityState.Unchanged;
                }

                _context.Orders.Add(order);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public Task<bool> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            try
            {
                return await _context.Orders.Include(u => u.User)
                                            .Include(oi => oi.OrderItems)
                                            .ThenInclude(p => p.Product)
                                            .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<IEnumerable<Order>> GetAllOrdersForUser(int userId)
        {
            try
            {
                return await _context.Orders.Include(u => u.User)
                                            .Include(oi => oi.OrderItems)
                                            .ThenInclude(p => p.Product)
                                            .Where(o => o.UserId == userId)
                                            .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Task<Order> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateOrder(int orderId, Order order)
        {
            try
            {
                var orderToEdit = await _context.Orders.SingleOrDefaultAsync(o => o.ID == orderId);

                if (orderToEdit == null) return false;

                orderToEdit.Status = order.Status;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}