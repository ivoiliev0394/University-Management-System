using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.GradesDtos
{
    public class GradeDetailsDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public string StudentName { get; set; } = null!;

        [Required]
        public int DisciplineId { get; set; }

        [Required]
        public string DisciplineName { get; set; } = null!;

        [Required]
        [Range(2.00, 6.00)]
        public decimal Value { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
