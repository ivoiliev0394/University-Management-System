using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.TeachersDtos
{
    public class TeacherResponseDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;
    }
}
