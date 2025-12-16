using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.TeachersDtos
{
    public class TeacherCreateDto
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
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Department { get; set; } = string.Empty;

        [Phone]
        public string Phone { get; set; } = string.Empty;
    }
}

