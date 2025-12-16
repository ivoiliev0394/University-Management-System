namespace University_System.UniversityManagementSystem.Core.Models
{
    public class TeacherDisciplineDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Semester { get; set; }
        public int Credits { get; set; }
    }

}
