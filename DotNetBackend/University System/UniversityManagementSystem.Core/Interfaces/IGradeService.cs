using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IGradeService
    {
        Task<IEnumerable<GradeDetailsDto>> GetAllAsync();
        Task<IEnumerable<GradeDetailsDto>> GetAllForTeacherAsync(string teacherUserId);

        Task<GradeDetailsDto?> GetByIdAsync(int id);
        Task<GradeDetailsDto?> GetByIdForTeacherAsync(int id, string teacherUserId);

        Task<int> CreateAsync(GradeCreateDto dto);

        Task<bool> UpdateAsync(int id, GradeUpdateDto dto);
        Task<bool> UpdateForTeacherAsync(int id, GradeUpdateDto dto, string teacherUserId);

        Task<bool> DeleteAsync(int id);
        Task<bool> DeleteForTeacherAsync(int id, string teacherUserId);

        Task<IEnumerable<GradeDetailsDto>> GetByStudentAsync(int studentId);
        Task<IEnumerable<GradeDetailsDto>> GetByDisciplineAsync(int disciplineId);
    }
}
