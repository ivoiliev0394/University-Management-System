namespace University_System.UniversityManagementSystem.Core.Models.ProfilesDtos
{
    public abstract class BaseProfDto
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
