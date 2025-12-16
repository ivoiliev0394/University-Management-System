namespace University_System.UniversityManagementSystem.Core.Models.ProfilesDtos
{
    public class AdminProfileDto : BaseProfDto
    {
        public DateTime CreatedOn { get; set; }
        public bool IsDeactivated { get; set; }
    }

}
