using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.StudentsDtos
{
    public class StudentListDto
    {
        public int Id { get; set; }

        [Display(Name = "Faculty Number")]
        public string FacultyNumber { get; set; } = null!;

        [Display(Name = "First Name")]
        public string FirstName { get; set; } = null!;

        [Display(Name = "Middle Name")]
        public string MiddleName { get; set; } = null!;

        [Display(Name = "Last Name")]
        public string LastName { get; set; } = null!;

        public string Major { get; set; } = null!;

        public int Course { get; set; }

        [EmailAddress]
        public string Email { get; set; } = null!;
    }
}
