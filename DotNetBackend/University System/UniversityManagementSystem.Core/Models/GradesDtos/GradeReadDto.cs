namespace University_System.UniversityManagementSystem.Core.Models.GradesDtos
{
    public class GradeReadDto
    {
        public int Id { get; set; }

        public string StudentName { get; set; } = null!;
        public string DisciplineName { get; set; } = null!;

        public decimal Value { get; set; }
        public DateTime Date { get; set; }
    }
}
