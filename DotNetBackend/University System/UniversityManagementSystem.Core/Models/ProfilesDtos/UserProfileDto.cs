using University_System.UniversityManagementSystem.Core.Models.StudentsDtos;

namespace University_System.UniversityManagementSystem.Core.Models.ProfilesDtos
{
    public class UserProfileDto : BaseProfDto
    {
        public StudentProfileDto? Student { get; set; }
        public TeacherProfileDto? Teacher { get; set; }
    }

}
