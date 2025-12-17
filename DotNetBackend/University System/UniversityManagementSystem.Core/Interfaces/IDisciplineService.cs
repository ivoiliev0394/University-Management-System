using System.Security.Claims;
using University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IDisciplineService
    {
        Task<IEnumerable<DisciplineReadDto>> GetAllAsync();
        Task<DisciplineReadDto?> GetByIdAsync(int id);
        Task<IEnumerable<DisciplineReadDto>> GetDisciplinesByStudentMajorAsync(string userId);
        Task<DisciplineResponseDto> CreateAsync(DisciplineCreateDto dto);
        Task<bool> UpdateAsync(int id, DisciplineUpdateDto dto, ClaimsPrincipal user);
        Task<bool> DeleteAsync(int id);
    }
}
