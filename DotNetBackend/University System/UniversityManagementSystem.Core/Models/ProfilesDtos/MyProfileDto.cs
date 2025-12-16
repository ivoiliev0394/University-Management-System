using University_System.UniversityManagementSystem.Core.Models.StudentsDtos;

namespace University_System.UniversityManagementSystem.Core.Models.ProfilesDtos
{
    public class MyProfileDto : BaseProfDto
    {
        public AdminProfileDto? Admin { get; set; }
        public StudentProfileDto? Student { get; set; }
        public TeacherProfileDto? Teacher { get; set; }
    }

}
