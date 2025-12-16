using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IGradeService
    {
        Task<IEnumerable<GradeDetailsDto>> GetAllAsync();
        Task<GradeDetailsDto?> GetByIdAsync(int id);

        Task<int> CreateAsync(GradeCreateDto dto);
        Task<bool> UpdateAsync(int id, GradeUpdateDto dto);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<GradeDetailsDto>> GetByStudentAsync(int studentId);
        Task<IEnumerable<GradeDetailsDto>> GetByDisciplineAsync(int disciplineId);
    }
}
