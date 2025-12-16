using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GradesController : ControllerBase
    {
        private readonly IGradeService _gradeService;

        public GradesController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _gradeService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var grade = await _gradeService.GetByIdAsync(id);
            return grade == null ? NotFound() : Ok(grade);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GradeCreateDto dto)
        {
            var id = await _gradeService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GradeUpdateDto dto)
        {
            var updated = await _gradeService.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _gradeService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpGet("by-student/{studentId}")]
        public async Task<IActionResult> ByStudent(int studentId)
            => Ok(await _gradeService.GetByStudentAsync(studentId));

        [HttpGet("by-discipline/{disciplineId}")]
        public async Task<IActionResult> ByDiscipline(int disciplineId)
            => Ok(await _gradeService.GetByDisciplineAsync(disciplineId));
    }
}
