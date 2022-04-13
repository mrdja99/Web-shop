using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Product
    {
        [Key]
        public int? ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Price { get; set; }

        public string ImageUrl { get; set; }
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public List<Characteristic> Characteristics { get; set; }
    }
}