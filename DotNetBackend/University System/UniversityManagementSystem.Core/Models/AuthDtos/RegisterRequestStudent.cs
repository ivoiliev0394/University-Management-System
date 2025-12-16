using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.AuthDtos
{
    public class RegisterRequestStudent
    {
        // ---------- AUTH ----------
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;

        [Required]
        public string Role { get; set; } = "Student";

        // ---------- STUDENT PROFILE ----------
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
        public string StudentEmail { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string Address { get; set; } = null!;
    }
}
