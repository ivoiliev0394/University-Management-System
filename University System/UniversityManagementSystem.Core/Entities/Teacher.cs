using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace University_System.UniversityManagementSystem.Core.Entities
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        public string Title { get; set; } = null!;

        [Required]
        [Phone]
        public string Phone { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Department { get; set; } = null!;

        // 🔗 Identity връзка
        [Required]
        public string UserId { get; set; } = null!;

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; } = null!;

        public ICollection<Discipline> Disciplines { get; set; } = new List<Discipline>();
    }
}
