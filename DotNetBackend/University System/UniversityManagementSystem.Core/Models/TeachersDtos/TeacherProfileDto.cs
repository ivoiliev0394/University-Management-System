using University_System.UniversityManagementSystem.Core.Models.ProfilesDtos;

namespace University_System.UniversityManagementSystem.Core.Models
{
    public class TeacherProfileDto : BaseProfDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        // 🔹 Колекции
        public ICollection<TeacherDisciplineDto> Disciplines { get; set; }
            = new List<TeacherDisciplineDto>();
    }

}
