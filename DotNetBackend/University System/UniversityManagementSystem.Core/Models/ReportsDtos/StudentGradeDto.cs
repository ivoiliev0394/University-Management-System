using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class StudentGradeDto
    {
        public string Discipline { get; set; } = null!;

        [Range(2, 6)]
        public decimal Value { get; set; }

        public DateTime Date { get; set; }
    }
}
