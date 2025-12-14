using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Entities.Base
{
    public abstract class BaseEntity
    {
        [Required]
        public bool IsDeleted { get; set; } = false;
    }
}
