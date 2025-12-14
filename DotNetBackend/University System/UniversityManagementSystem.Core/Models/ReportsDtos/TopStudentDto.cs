using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class TopStudentDto
    {
        [Required]
        [StringLength(150, MinimumLength = 3)]
        public string Student { get; set; } = null!;

        [Required]
        [Range(2.00, 6.00, ErrorMessage = "Grade must be between 2.00 and 6.00")]
        public decimal Grade { get; set; }

    }
}
