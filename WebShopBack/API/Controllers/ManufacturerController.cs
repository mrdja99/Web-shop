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
    public class ManufacturerController : ControllerBase
    {
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        // GET: api/manufacturer
        [HttpGet]
        public async Task<ActionResult<List<Manufacturer>>> GetAllManufacturers()
        {
            var manufacturers = await _manufacturerService.GetAllManufacturers();

            if (manufacturers == null || manufacturers.Count() == 0) return NotFound();

            return Ok(manufacturers);
        }

        // POST: api/manufacturer
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddManufacturer(Manufacturer manufacturer)
        {
            if (await _manufacturerService.AddManufacturer(manufacturer)) return Ok(manufacturer);
            return NotFound();
        }
    }
}