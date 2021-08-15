using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce_React.Models
{
    public class Brand
    {
        
        public int BrandId { get; set; }
        public String BrandName { get; set; }
    }
}
