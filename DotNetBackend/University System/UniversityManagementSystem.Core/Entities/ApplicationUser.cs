using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Entities
{

    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsDeactivated { get; set; } = false;
    }
}
