using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class GradesController : ControllerBase
    {
        private readonly IGradeService _gradeService;

        // ✅ САМО ЕДИН constructor
        public GradesController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }

        // GET: api/Grades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
            var grades = await _gradeService.GetAllAsync();

            return Ok(grades.Select(g => new
            {
                g.Id,
                Student = $"{g.Student.FirstName} {g.Student.LastName}",
                Discipline = g.Discipline.Name,
                g.Value,
                g.Date
            }));
        }

        // GET: api/Grades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> GetGrade(int id)
        {
            var grade = await _gradeService.GetByIdAsync(id);

            if (grade == null)
                return NotFound();

            return Ok(grade);
        }

        // POST: api/Grades
        [HttpPost]
        public async Task<IActionResult> CreateGrade([FromBody] Grade grade)
        {
            await _gradeService.CreateAsync(grade);
            return CreatedAtAction(nameof(GetGrade), new { id = grade.Id }, grade);
        }

        // PUT: api/Grades/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrade(int id, [FromBody] Grade grade)
        {
            if (id != grade.Id)
                return BadRequest();

            await _gradeService.UpdateAsync(id, grade);
            return NoContent();
        }

        // DELETE: api/Grades/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(int id)
        {
            await _gradeService.DeleteAsync(id);
            return NoContent();
        }

        // GET: api/Grades/by-student/5
        [HttpGet("by-student/{studentId}")]
        public async Task<IActionResult> GetByStudent(int studentId)
        {
            var grades = await _gradeService.GetGradesByStudentAsync(studentId);

            if (!grades.Any())
                return NotFound();

            return Ok(grades.Select(g => new
            {
                Discipline = g.Discipline.Name,
                Grade = g.Value,
                g.Date
            }));
        }

        // GET: api/Grades/by-discipline/3
        [HttpGet("by-discipline/{disciplineId}")]
        public async Task<IActionResult> GetByDiscipline(int disciplineId)
        {
            var grades = await _gradeService.GetGradesByDisciplineAsync(disciplineId);

            if (!grades.Any())
                return NotFound();

            return Ok(grades.Select(g => new
            {
                Student = $"{g.Student.FirstName} {g.Student.LastName}",
                Grade = g.Value,
                g.Date
            }));
        }
    }
}
