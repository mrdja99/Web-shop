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
    public class ManufacturerService : IManufacturerService
    {
        private readonly ApplicationDbContext _context;
        public ManufacturerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Manufacturer>> GetAllManufacturers()
        {
            try
            {
                return await _context.Manufacturers.ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<bool> AddManufacturer(Manufacturer manufacturer)
        {
            try
            {
                _context.Manufacturers.Add(manufacturer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public Task<bool> DeleteManufacturer(int id)
        {
            throw new NotImplementedException();
        }

    }
}