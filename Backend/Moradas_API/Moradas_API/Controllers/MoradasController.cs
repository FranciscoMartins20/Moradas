using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moradas_API.Data;
using Moradas_API.Models;

namespace Moradas_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/moradas")]
  
    public class MoradasController : ControllerBase
    {
        private readonly MoradaDbContext _context;

        public MoradasController(MoradaDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Este método serve para obter as moradas.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Morada>>> GetMoradas()
        {
          if (_context.Moradas == null)
          {
              return NotFound();
          }
            return await _context.Moradas.ToListAsync();
        }

        /// <summary>
        /// Este método serve para obter todas as moradas por ID.
        /// </summary>
        /// <param name="id">Identificador de morada</param>
        /// <returns>Retorna um objeto do tipo Morada</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Morada>> GetMorada(int id)
        {
          if (_context.Moradas == null)
          {
              return NotFound();
          }
            var morada = await _context.Moradas.FindAsync(id);

            if (morada == null)
            {
                return NotFound();
            }

            return morada;
        }

        /// <summary>
        /// Este método serve para editar as moradas por ID.
        /// </summary>
        /// <param name="id">Identificador de morada</param>
        /// <returns>Retorna um objeto do tipo Morada</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMorada(int id, Morada morada)
        {
            if (id != morada.id)
            {
                return BadRequest();
            }

            _context.Entry(morada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoradaExists(id))
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

        /// <summary>
        /// Este método serve para adicionar moradas.
        /// </summary>

        [HttpPost]
        public async Task<ActionResult<Morada>> PostMorada(Morada morada)
        {
          if (_context.Moradas == null)
          {
              return Problem("Entity set 'MoradaDbContext.Moradas'  is null.");
          }
            _context.Moradas.Add(morada);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMorada", new { id = morada.id }, morada);
        }

        /// <summary>
        /// Este método serve para apagar as moradas por ID.
        /// </summary>
        /// <param name="id">Identificador de morada</param>
        /// <returns>Retorna um objeto do tipo Morada</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMorada(int id)
        {
            if (_context.Moradas == null)
            {
                return NotFound();
            }
            var morada = await _context.Moradas.FindAsync(id);
            if (morada == null)
            {
                return NotFound();
            }

            _context.Moradas.Remove(morada);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MoradaExists(int id)
        {
            return (_context.Moradas?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
