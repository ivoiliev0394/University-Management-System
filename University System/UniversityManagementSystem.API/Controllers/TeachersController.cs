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
    public class TeachersController : ControllerBase
    {
        private readonly UniversityIdentityDbContext _context;

        public TeachersController(UniversityIdentityDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            return await _context.Teachers
                .Include(t => t.Disciplines)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(int id)
        {
            var teacher = await _context.Teachers
                .Include(t => t.Disciplines)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null)
                return NotFound();

            return teacher;
        }

        [HttpPost]
        public async Task<ActionResult<Teacher>> CreateTeacher(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTeacher), new { id = teacher.Id }, teacher);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(int id, Teacher teacher)
        {
            if (id != teacher.Id)
                return BadRequest();

            _context.Entry(teacher).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null)
                return NotFound();

            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
