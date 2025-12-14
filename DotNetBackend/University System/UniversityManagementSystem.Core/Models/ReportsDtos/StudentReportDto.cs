namespace University_System.UniversityManagementSystem.Core.Models.ReportsDtos
{
    public class StudentReportDto
    {
        public int Id { get; set; }

        public string FacultyNumber { get; set; } = null!;

        public string FullName { get; set; } = null!;

        public string Major { get; set; } = null!;

        public int Course { get; set; }

        public List<StudentGradeDto> Grades { get; set; } = new();
    }
}
