using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class StudentAverageDto
    {
        [Required]
        public string Student { get; set; } = null!;

        [Range(2, 6)]
        public decimal Average { get; set; }
    }
}
