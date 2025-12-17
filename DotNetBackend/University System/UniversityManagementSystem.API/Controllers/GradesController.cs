using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [Authorize(Roles = "Admin,Teacher")]
    [ApiController]
    [Route("api/[controller]")]
    public class GradesController : ControllerBase
    {
        private readonly IGradeService _gradeService;

        public GradesController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }

        private string UserId() => User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (User.IsInRole("Admin"))
                return Ok(await _gradeService.GetAllAsync());

            return Ok(await _gradeService.GetAllForTeacherAsync(UserId()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (User.IsInRole("Admin"))
            {
                var g = await _gradeService.GetByIdAsync(id);
                return g == null ? NotFound() : Ok(g);
            }

            var gt = await _gradeService.GetByIdForTeacherAsync(id, UserId());
            return gt == null ? NotFound() : Ok(gt);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] GradeCreateDto dto)
        {
            // Teacher може да създава, но ако искаш да е само за негови дисциплини,
            // тогава тук трябва да валидираме disciplineId да е негова (ще го направим след това).
            var id = await _gradeService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GradeUpdateDto dto)
        {
            bool ok;

            if (User.IsInRole("Admin"))
                ok = await _gradeService.UpdateAsync(id, dto);
            else
                ok = await _gradeService.UpdateForTeacherAsync(id, dto, UserId());

            return ok ? NoContent() : Forbid();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool ok;

            if (User.IsInRole("Admin"))
                ok = await _gradeService.DeleteAsync(id);
            else
                ok = await _gradeService.DeleteForTeacherAsync(id, UserId());

            return ok ? NoContent() : Forbid();
        }

        [HttpGet("by-student/{studentId}")]
        public async Task<IActionResult> ByStudent(int studentId)
            => Ok(await _gradeService.GetByStudentAsync(studentId));

        [HttpGet("by-discipline/{disciplineId}")]
        public async Task<IActionResult> ByDiscipline(int disciplineId)
            => Ok(await _gradeService.GetByDisciplineAsync(disciplineId));
    }
}
