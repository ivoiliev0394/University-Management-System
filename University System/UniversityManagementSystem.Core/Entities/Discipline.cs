using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace University_System.UniversityManagementSystem.Core.Entities
{
    public class Discipline
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Range(1, 10)]
        public int Semester { get; set; }

        [Range(1, 30)]
        public int Credits { get; set; }

        [Required]
        public int TeacherId { get; set; }

        [ForeignKey(nameof(TeacherId))]
        public Teacher Teacher { get; set; } = null!;

        public ICollection<Grade> Grades { get; set; } = new List<Grade>();
    }
}
