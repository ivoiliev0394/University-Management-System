using University_System.UniversityManagementSystem.Core.Models.ProfilesDtos;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;

namespace University_System.UniversityManagementSystem.Core.Models.StudentsDtos
{
    public class StudentProfileDto : BaseProfDto
    {
        public string FacultyNumber { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public string Major { get; set; } = string.Empty;
        public int Course { get; set; }

        public string Address { get; set; } = string.Empty;

        // 🔹 Колекции
        public ICollection<StudentGradeDto> Grades { get; set; }
            = new List<StudentGradeDto>();
    }


}
