using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class DiplomaEligibleStudentDto
    {
        [Required]
        [MinLength(3)]
        public string Student { get; set; } = null!;

        [Range(2.00, 6.00)]
        public decimal Average { get; set; }
    }
}
