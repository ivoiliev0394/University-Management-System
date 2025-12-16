using University_System.UniversityManagementSystem.Core.Models.StudentsDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentListDto>> GetAllAsync();
        Task<StudentDetailsDto?> GetByIdAsync(int id);
        Task<StudentResponseDto> CreateAsync(StudentCreateDto dto);
        Task<bool> UpdateAsync(int id, StudentUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
