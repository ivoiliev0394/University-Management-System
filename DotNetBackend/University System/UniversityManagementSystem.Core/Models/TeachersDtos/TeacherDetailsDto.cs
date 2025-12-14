namespace University_System.UniversityManagementSystem.Core.Models.TeachersDtos
{
    public class TeacherDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Department { get; set; } = null!;
    }
}
