using University_System.UniversityManagementSystem.Core.Entities;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IGradeService
    {
        Task<IEnumerable<Grade>> GetAllAsync();
        Task<Grade?> GetByIdAsync(int id);
        Task CreateAsync(Grade grade);
        Task UpdateAsync(int id, Grade grade);
        Task DeleteAsync(int id);
        Task<List<Grade>> GetGradesByStudentAsync(int studentId);
        Task<List<Grade>> GetGradesByDisciplineAsync(int disciplineId);
    }
}
