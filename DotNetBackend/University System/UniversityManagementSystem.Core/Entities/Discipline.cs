using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using University_System.UniversityManagementSystem.Core.Entities.Base;

namespace University_System.UniversityManagementSystem.Core.Entities
{
    public class Discipline : BaseEntity
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

        // ✅ ТОВА е задължителното
        [Required]
        public int TeacherId { get; set; }

        // ✅ Navigation – БЕЗ Required и nullable
        [ForeignKey(nameof(TeacherId))]
        public Teacher? Teacher { get; set; }

        public ICollection<Grade> Grades { get; set; } = new List<Grade>();
    }

}
