using System.ComponentModel.DataAnnotations;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;

namespace University_System.UniversityManagementSystem.Core.Models.StudentsDtos
{
    public class StudentDetailsDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string FacultyNumber { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = null!;
        [Required]
        [StringLength(50)]
        public string MiddleName { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Major { get; set; } = null!;

        [Range(1, 6)]
        public int Course { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [StringLength(200)]
        public string Address { get; set; } = null!;

        public List<StudentGradeDto> Grades { get; set; } = new();
    }
}
