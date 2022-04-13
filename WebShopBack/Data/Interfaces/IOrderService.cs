using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<Order>> GetAllOrdersForUser(int userId);
        Task<Order> GetOrder(int orderId);
        Task<bool> AddOrder(Order order);
        Task<bool> UpdateOrder(int orderId, Order order);
        Task<bool> DeleteOrder(int orderId);
    }
}