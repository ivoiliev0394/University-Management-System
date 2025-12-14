using Microsoft.AspNetCore.Mvc;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DisciplinesController : ControllerBase
    {
        private readonly IDisciplineService _disciplineService;

        public DisciplinesController(IDisciplineService disciplineService)
        {
            _disciplineService = disciplineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _disciplineService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var discipline = await _disciplineService.GetByIdAsync(id);
            return discipline == null ? NotFound() : Ok(discipline);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DisciplineCreateDto dto)
        {
            var id = await _disciplineService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id }, null);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DisciplineUpdateDto dto)
        {
            var updated = await _disciplineService.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _disciplineService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}

