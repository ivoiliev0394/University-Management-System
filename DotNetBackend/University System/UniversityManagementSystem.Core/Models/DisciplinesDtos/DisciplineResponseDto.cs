namespace University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos
{
    public class DisciplineResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Semester { get; set; }
        public int Credits { get; set; }
        public int TeacherId { get; set; }
    }
}
