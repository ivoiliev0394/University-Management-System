using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.GradesDtos
{
    public class GradeUpdateDto
    {
        [Required]
        public int StudentId { get; set; }

        [Required]
        public int DisciplineId { get; set; }

        [Required]
        [Range(2.00, 6.00)]
        public decimal Value { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
