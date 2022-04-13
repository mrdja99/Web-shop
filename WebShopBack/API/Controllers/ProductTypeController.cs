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
    public class ProductTypeController : ControllerBase
    {
        private readonly IProductTypeService _productTypeService;
        public ProductTypeController(IProductTypeService productTypeService)
        {
            _productTypeService = productTypeService;

        }

        // GET: api/productType
        [HttpGet]
        public async Task<ActionResult<List<ProductType>>> GetAllProductTypes()
        {
            var productTypes = await _productTypeService.GetAllProductTypes();

            if (productTypes == null || productTypes.Count() == 0) return NotFound();

            return Ok(productTypes);
        }

        // POST: api/productType
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddProductType(ProductType productType)
        {
            if (await _productTypeService.AddProductType(productType)) return Ok(productType);
            return NotFound();
        }
    }
}