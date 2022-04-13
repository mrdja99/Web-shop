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
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<bool> AddProduct(Product product)
        {
            try
            {
                // product.ManufacturerId = product.Manufacturer.ID;
                // product.ProductTypeId = product.ProductType.ID;
                // _context.Entry(product.Manufacturer).State = EntityState.Unchanged;
                // _context.Entry(product.ProductType).State = EntityState.Unchanged;
                _context.Products.Add(product);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<bool> DeleteProduct(int productId)
        {
            try
            {
                var product = await _context.Products.SingleOrDefaultAsync(p => p.ID == productId);

                if (product == null) return false;

                _context.Products.Remove(product);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<List<Product>> GetAllProducts()
        {
            try
            {
                return await _context.Products.Include(m => m.Manufacturer)
                                        .Include(pt => pt.ProductType)
                                        .Include(ch => ch.Characteristics)
                                        .ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public Task<Product> GetProduct(int productId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateProduct(int productId, Product product)
        {
            try
            {
                var productToEdit = await _context.Products.SingleOrDefaultAsync(p => p.ID == productId);

                if (productToEdit == null) return false;

                foreach (Characteristic ch in productToEdit.Characteristics)
                {
                    if (!product.Characteristics.Contains(ch))
                    {
                        _context.Entry(ch).State = EntityState.Deleted;
                    }
                }

                await _context.SaveChangesAsync();

                _context.Entry(productToEdit).State = EntityState.Detached;

                _context.Products.Update(new Product
                {
                    ID = productId,
                    Name = product.Name,
                    Price = product.Price,
                    ManufacturerId = product.ManufacturerId,
                    ProductTypeId = product.ProductTypeId,
                    Characteristics = product.Characteristics
                });

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