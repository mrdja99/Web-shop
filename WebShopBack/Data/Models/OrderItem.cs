using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Models
{
    public class OrderItem
    {

        public int ID { get; set; }
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public double OrderItemPrice { get; set; }
        [Required]
        public int? ProductId {get; set;}
        public Product Product { get; set; }
    }
}