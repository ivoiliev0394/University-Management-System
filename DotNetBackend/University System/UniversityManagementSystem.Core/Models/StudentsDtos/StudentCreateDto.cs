using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.StudentsDtos
{
    public class StudentCreateDto
    {
        [Required]
        public string FacultyNumber { get; set; } = null!;

        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string MiddleName { get; set; } = null!; // ✅

        [Required]
        public string LastName { get; set; } = null!;

        [Required]
        public string Major { get; set; } = null!;

        [Range(1, 6)]
        public int Course { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        public string? Address { get; set; }

        // 🔴 КЛЮЧОВО
        [Required]
        public string UserId { get; set; } = null!;
    }
}
