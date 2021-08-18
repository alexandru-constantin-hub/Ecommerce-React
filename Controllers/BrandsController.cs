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

        [HttpPut("{id}")]
        public ActionResult Update(Brand brand)
        {
            try
            {
                Brand b = _context.Brands.FirstOrDefault(b => b.BrandId == brand.BrandId);
                if (b != null)
                {
                    b.BrandName = brand.BrandName;
                    _context.Brands.Update(brand);
                    _context.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
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

            try
            {
                Brand b = _context.Brands.FirstOrDefault(b => b.BrandId == id);
                if (b != null)
                {
                    _context.Brands.Remove(b);
                    _context.SaveChanges();
                }
                else
                    return NotFound();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok(id);
        }






    }
}
