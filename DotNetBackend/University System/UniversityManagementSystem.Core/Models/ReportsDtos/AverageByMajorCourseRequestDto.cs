using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class AverageByMajorCourseRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Major { get; set; } = null!;

        [Range(1, 10)]
        public int Course { get; set; }

    }
}
