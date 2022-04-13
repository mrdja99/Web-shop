using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProduct(int productId);
        Task<bool> DeleteProduct(int productId);
        Task<bool> AddProduct(Product product);
        Task<bool> UpdateProduct(int productId, Product product);
    }
}