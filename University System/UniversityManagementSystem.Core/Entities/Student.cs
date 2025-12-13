using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace University_System.UniversityManagementSystem.Core.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string FacultyNumber { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string MiddleName { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Major { get; set; } = null!;

        [Range(1, 6)]
        public int Course { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(200)]
        public string Address { get; set; } = null!;

        // 🔗 Identity връзка
        [Required]
        public string UserId { get; set; } = null!;

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; } = null!;

        public ICollection<Grade> Grades { get; set; } = new List<Grade>();
    }
}
