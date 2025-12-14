using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.TeachersDtos
{
    public class TeacherCreateDto
    {
        [Required, StringLength(100)]
        public string Name { get; set; } = null!;

        [Required, StringLength(50)]
        public string Title { get; set; } = null!;

        [Required, Phone]
        public string Phone { get; set; } = null!;

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required, StringLength(100)]
        public string Department { get; set; } = null!;

        [Required]
        public string UserId { get; set; } = null!;
    }
}
