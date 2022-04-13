using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;

namespace Data.Interfaces
{
    public interface IProductTypeService
    {
        Task<List<ProductType>> GetAllProductTypes();
        Task<bool> AddProductType(ProductType productType);
        Task<bool> DeleteProductType(int Id);
    }
}