using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.StudentsDtos
{
    public class StudentCreateDto
    {
        // ===== Identity =====
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        // ===== Profile =====
        [Required]
        [MaxLength(20)]
        public string FacultyNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string MiddleName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Major { get; set; } = string.Empty;

        [Range(1, 6)]
        public int Course { get; set; }

        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;
    }
}
