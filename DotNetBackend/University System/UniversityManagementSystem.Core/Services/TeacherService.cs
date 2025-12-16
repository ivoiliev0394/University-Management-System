using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.TeachersDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly UniversityIdentityDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TeacherService(UniversityIdentityDbContext context,UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<TeacherDetailsDto>> GetAllAsync()
        {
            return await _context.Teachers
                .Select(t => new TeacherDetailsDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Title = t.Title,
                    Phone = t.Phone,
                    Email = t.Email,
                    Department = t.Department
                })
                .ToListAsync();
        }

        public async Task<TeacherDetailsDto?> GetByIdAsync(int id)
        {
            return await _context.Teachers
                .Where(t => t.Id == id)
                .Select(t => new TeacherDetailsDto
                {
                    Id = t.Id,
                    Name = t.Name,
                    Title = t.Title,
                    Phone = t.Phone,
                    Email = t.Email,
                    Department = t.Department
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TeacherResponseDto> CreateAsync(TeacherCreateDto dto)
        {
            // 1️⃣ Create Identity User
            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                CreatedOn = DateTime.UtcNow
            };  

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                throw new Exception(string.Join("; ",
                    result.Errors.Select(e => e.Description)));

            // 2️⃣ Assign Teacher role
            await _userManager.AddToRoleAsync(user, "Teacher");

            // 3️⃣ Create Teacher profile
            var teacher = new Teacher
            {
                Name = dto.Name,
                Title = dto.Title,
                Phone = dto.Phone,
                Email = dto.Email,
                Department = dto.Department,
                UserId = user.Id
            };

            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return new TeacherResponseDto 
            {
                Id = teacher.Id,
                Name = teacher.Name,
                Title = teacher.Title,
                Email = teacher.Email,
                Department = teacher.Department
            };
        }


        public async Task<bool> UpdateAsync(int id, TeacherUpdateDto dto)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null) return false;

            teacher.Name = dto.Name;
            teacher.Title = dto.Title;
            teacher.Phone = dto.Phone;
            teacher.Email = dto.Email;
            teacher.Department = dto.Department;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null) return false;

            teacher.IsDeleted=true;
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
