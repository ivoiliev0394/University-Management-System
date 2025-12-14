using University_System.UniversityManagementSystem.Core.Models.TeachersDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface ITeacherService
    {
        Task<IEnumerable<TeacherDetailsDto>> GetAllAsync();
        Task<TeacherDetailsDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(TeacherCreateDto dto);
        Task<bool> UpdateAsync(int id, TeacherUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
