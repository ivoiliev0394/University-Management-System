using University_System.UniversityManagementSystem.Core.Models.ProfilesDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IProfileService
    {
        Task<MyProfileDto> GetMyProfileAsync(string userId);
        Task<UserProfileDto> GetUserProfileAsync(string requesterId, string targetUserId);
        Task<IEnumerable<BaseProfileDto>> GetAllUsersAsync(string requesterId);
    }
}
