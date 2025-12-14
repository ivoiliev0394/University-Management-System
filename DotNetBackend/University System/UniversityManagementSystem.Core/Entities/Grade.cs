using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using University_System.UniversityManagementSystem.Core.Entities.Base;

namespace University_System.UniversityManagementSystem.Core.Entities
{
    public class Grade : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [ForeignKey(nameof(StudentId))]
        public Student Student { get; set; } = null!;

        [Required]
        public int DisciplineId { get; set; }

        [ForeignKey(nameof(DisciplineId))]
        public Discipline Discipline { get; set; } = null!;

        [Range(2.00, 6.00)]
        public decimal Value { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
