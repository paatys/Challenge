using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webmotors.Challenge.Model;

namespace Webmotors.Challenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnuncioWebmotorsController : ControllerBase
    {
        private readonly DbConnection _context;

        public AnuncioWebmotorsController(DbConnection context)
        {
            initDB.Initialize(context);
            _context = context;
        }

        // GET: api/AnuncioWebmotors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnuncioWebmotors>>> GetAnuncioWebmotors()
        {
            return await _context.AnuncioWebmotors.ToListAsync();
        }

        // GET: api/AnuncioWebmotors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AnuncioWebmotors>> GetAnuncioWebmotors(int id)
        {
            var anuncioWebmotors = await _context.AnuncioWebmotors.FindAsync(id);

            if (anuncioWebmotors == null)
            {
                return NotFound();
            }

            return anuncioWebmotors;
        }

        // PUT: api/AnuncioWebmotors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnuncioWebmotors(int id, AnuncioWebmotors anuncioWebmotors)
        {
            if (id != anuncioWebmotors.ID)
            {
                return BadRequest();
            }

            _context.Entry(anuncioWebmotors).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnuncioWebmotorsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AnuncioWebmotors
        [HttpPost]
        public async Task<ActionResult<AnuncioWebmotors>> PostAnuncioWebmotors(AnuncioWebmotors anuncioWebmotors)
        {
            _context.AnuncioWebmotors.Add(anuncioWebmotors);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAnuncioWebmotors", new { id = anuncioWebmotors.ID }, anuncioWebmotors);
        }

        // DELETE: api/AnuncioWebmotors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AnuncioWebmotors>> DeleteAnuncioWebmotors(int id)
        {
            var anuncioWebmotors = await _context.AnuncioWebmotors.FindAsync(id);
            if (anuncioWebmotors == null)
            {
                return NotFound();
            }

            _context.AnuncioWebmotors.Remove(anuncioWebmotors);
            await _context.SaveChangesAsync();

            return anuncioWebmotors;
        }

        private bool AnuncioWebmotorsExists(int id)
        {
            return _context.AnuncioWebmotors.Any(e => e.ID == id);
        }
    }
}
