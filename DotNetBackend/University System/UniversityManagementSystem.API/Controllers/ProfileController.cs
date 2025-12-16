using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        private string UserId =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // -------------------- ME --------------------
        [HttpGet("me")]
        public async Task<IActionResult> Me()
            => Ok(await _profileService.GetMyProfileAsync(UserId));

        // -------------------- USER BY ID --------------------
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
            => Ok(await _profileService.GetUserProfileAsync(UserId, id));

        // -------------------- ALL USERS --------------------
        [Authorize(Roles = "Admin")]
        [HttpGet("allusers")]
        public async Task<IActionResult> AllUsers()
            => Ok(await _profileService.GetAllUsersAsync(UserId));
    }

}
