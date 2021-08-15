using Ecommerce_React.Data;
using Ecommerce_React.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce_React.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        public readonly ApplicationDbContext _context = null;

        public BrandsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetAllBrands()
        {
            List<Brand> brands = _context.Brands.ToList();
            return Ok(brands);
        }

        [HttpGet]
        public ActionResult GetAllBrandsById(int Id)
        {
            try
            {
                Brand brand = _context.Brands.FirstOrDefault(b => b.BrandId == Id);
                return Ok(brand);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);

            }
            List<Brand> brands = _context.Brands.ToList();
            return Ok(brands);
        }

        [HttpPut]
        public ActionResult Update(Brand brand)
        {
            _context.Brands.Update(brand);
            _context.SaveChanges();
            return Ok(brand);
        }

        [HttpPost]
        public ActionResult Create(Brand brand)
        {
            _context.Brands.Add(brand);
            _context.SaveChanges();
            return Ok(brand);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _context.Brands.Remove(new Brand { BrandId = id });
            _context.SaveChanges();
            return Ok(id);
        }






    }
}
