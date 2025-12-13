using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.API.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class DisciplinesController : ControllerBase
    {
        private readonly UniversityIdentityDbContext _context;

        public DisciplinesController(UniversityIdentityDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Discipline>>> GetDisciplines()
        {
            return await _context.Disciplines
                .Include(d => d.Teacher)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Discipline>> GetDiscipline(int id)
        {
            var discipline = await _context.Disciplines
                .Include(d => d.Teacher)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (discipline == null)
                return NotFound();

            return discipline;
        }

        [HttpPost]
        public async Task<ActionResult<Discipline>> CreateDiscipline(Discipline discipline)
        {
            _context.Disciplines.Add(discipline);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDiscipline), new { id = discipline.Id }, discipline);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiscipline(int id, Discipline discipline)
        {
            if (id != discipline.Id)
                return BadRequest();

            _context.Entry(discipline).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscipline(int id)
        {
            var discipline = await _context.Disciplines.FindAsync(id);
            if (discipline == null)
                return NotFound();

            _context.Disciplines.Remove(discipline);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
