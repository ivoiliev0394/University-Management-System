using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models;
using University_System.UniversityManagementSystem.Core.Models.ProfilesDtos;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;
using University_System.UniversityManagementSystem.Core.Models.StudentsDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UniversityIdentityDbContext _context;

        public ProfileService(
            UserManager<ApplicationUser> userManager,
            UniversityIdentityDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // ===================== ME =====================
        public async Task<MyProfileDto> GetMyProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId)
                ?? throw new Exception("User not found");

            var role = (await _userManager.GetRolesAsync(user)).First();

            var result = new MyProfileDto
            {
                Id = user.Id,
                Email = user.Email!,
                Role = role
            };

            if (role == "Admin")
            {
                result.Admin = new AdminProfileDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Role = role,
                    CreatedOn = user.CreatedOn,
                    IsDeactivated = user.IsDeactivated
                };
            }
            else if (role == "Student")
            {
                var student = await _context.Students
                    .Include(s => s.Grades)
                        .ThenInclude(g => g.Discipline)
                    .FirstAsync(s => s.UserId == user.Id);

                result.Student = MapStudent(student, role);
            }
            else if (role == "Teacher")
            {
                var teacher = await _context.Teachers
                    .Include(t => t.Disciplines)
                    .FirstAsync(t => t.UserId == user.Id);

                result.Teacher = MapTeacher(teacher, role);
            }

            return result;
        }

        // ===================== USER BY ID =====================
        public async Task<UserProfileDto> GetUserProfileAsync(string requesterId, string targetUserId)
        {
            var requester = await _userManager.FindByIdAsync(requesterId)
                ?? throw new Exception("Requester not found");

            var requesterRole = (await _userManager.GetRolesAsync(requester)).First();

            var targetUser = await _userManager.FindByIdAsync(targetUserId)
                ?? throw new Exception("Target user not found");

            var targetRole = (await _userManager.GetRolesAsync(targetUser)).First();

            // 🔒 Admin profile – само Admin
            if (targetRole == "Admin" && requesterRole != "Admin")
                throw new UnauthorizedAccessException();

            var result = new UserProfileDto
            {
                Id = targetUser.Id,
                Email = targetUser.Email!,
                Role = targetRole
            };

            if (targetRole == "Student")
            {
                var student = await _context.Students
                    .Include(s => s.Grades)
                        .ThenInclude(g => g.Discipline)
                    .FirstAsync(s => s.UserId == targetUser.Id);

                result.Student = MapStudent(student, targetRole);
            }
            else if (targetRole == "Teacher")
            {
                var teacher = await _context.Teachers
                    .Include(t => t.Disciplines)
                    .FirstAsync(t => t.UserId == targetUser.Id);

                result.Teacher = MapTeacher(teacher, targetRole);
            }

            return result;
        }

        // ===================== ALL USERS =====================
        public async Task<IEnumerable<BaseProfileDto>> GetAllUsersAsync(string requesterId)
        {
            var requester = await _userManager.FindByIdAsync(requesterId)
                ?? throw new Exception("Requester not found");

            var requesterRole = (await _userManager.GetRolesAsync(requester)).First();

            var users = _userManager.Users.ToList();
            var result = new List<BaseProfileDto>();

            foreach (var user in users)
            {
                var role = (await _userManager.GetRolesAsync(user)).First();

                if (role == "Admin" && requesterRole != "Admin")
                    continue;

                result.Add(new BaseProfileDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Role = role
                });
            }

            return result;
        }

        // ===================== MAPPERS =====================
        private StudentProfileDto MapStudent(Student s, string role)
        {
            return new StudentProfileDto
            {
                Id = s.UserId,
                Email = s.Email,
                Role = role,
                FacultyNumber = s.FacultyNumber,
                FirstName = s.FirstName,
                MiddleName = s.MiddleName,
                LastName = s.LastName,
                Major = s.Major,
                Course = s.Course,
                Address = s.Address,
                Grades = s.Grades.Select(g => new StudentGradeDto
                {
                    DisciplineId = g.DisciplineId,
                    Discipline = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                }).ToList()
            };
        }

        private TeacherProfileDto MapTeacher(Teacher t, string role)
        {
            return new TeacherProfileDto
            {
                Id = t.UserId,
                Email = t.Email,
                Role = role,
                FirstName = t.Name,
                Title = t.Title,
                Department = t.Department,
                Disciplines = t.Disciplines.Select(d => new TeacherDisciplineDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Semester = d.Semester,
                    Credits = d.Credits
                }).ToList()
            };
        }
    }
}
