using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Characteristic
    {

        public int ID { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Value { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is Characteristic ch)
            {
                return (ch.Name == this.Name && ch.Value == this.Value);
            }

            return false;
        }

        public override int GetHashCode()
        {
            return Name.GetHashCode();
        }
    }
}