using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplineService _disciplineService;
        
        public DisciplinesController(IDisciplineService disciplineService)
        {
            _disciplineService = disciplineService;
            
        }
        [Authorize(Roles = "Admin,Teacher")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _disciplineService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var discipline = await _disciplineService.GetByIdAsync(id);
            return discipline == null ? NotFound() : Ok(discipline);
        }

        [Authorize(Roles = "Student")]
        [HttpGet("by-my-major")]
        public async Task<IActionResult> GetDisciplinesByMyMajor()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var result = await _disciplineService.GetDisciplinesByStudentMajorAsync(userId!);

            return Ok(result);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DisciplineCreateDto dto)
        {
            var discipline = await _disciplineService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = discipline.Id },
                discipline
            );
        }

        [Authorize(Roles = "Admin,Teacher")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromBody] DisciplineUpdateDto dto)
        {
            var updated = await _disciplineService.UpdateAsync(id,dto, User);

            return updated ? NoContent() : Forbid();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _disciplineService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}

