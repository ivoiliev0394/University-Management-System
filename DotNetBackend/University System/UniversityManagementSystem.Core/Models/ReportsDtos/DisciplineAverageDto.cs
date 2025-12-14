using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class DisciplineAverageDto
    {
        public int DisciplineId { get; set; }

        public string Discipline { get; set; } = null!;

        [Range(2, 6)]
        public decimal AverageGrade { get; set; }

    }
}
