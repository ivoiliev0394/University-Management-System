using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IGradeService
    {
        Task<IEnumerable<GradeReadDto>> GetAllAsync();
        Task<GradeReadDto?> GetByIdAsync(int id);

        Task<int> CreateAsync(GradeCreateDto dto);
        Task<bool> UpdateAsync(int id, GradeUpdateDto dto);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<GradeReadDto>> GetByStudentAsync(int studentId);
        Task<IEnumerable<GradeReadDto>> GetByDisciplineAsync(int disciplineId);
    }
}
