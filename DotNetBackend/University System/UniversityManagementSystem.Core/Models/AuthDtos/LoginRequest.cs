using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.AuthDtos
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
