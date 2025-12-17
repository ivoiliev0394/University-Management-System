using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class DisciplineService : IDisciplineService
    {
        private readonly UniversityIdentityDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public DisciplineService(UniversityIdentityDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context; _userManager = userManager;
        }

        public async Task<IEnumerable<DisciplineReadDto>> GetAllAsync()
        {
            return await _context.Disciplines
                .Include(d => d.Teacher)
                .Select(d => new DisciplineReadDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Semester = d.Semester,
                    Credits = d.Credits,
                    TeacherId = d.TeacherId,
                    TeacherName = d.Teacher!.Name
                })
                .ToListAsync();
        }

        public async Task<DisciplineReadDto?> GetByIdAsync(int id)
        {
            return await _context.Disciplines
                .Include(d => d.Teacher)
                .Where(d => d.Id == id)
                .Select(d => new DisciplineReadDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Semester = d.Semester,
                    Credits = d.Credits,
                    TeacherId = d.TeacherId,
                    TeacherName = d.Teacher!.Name
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<DisciplineReadDto>> GetDisciplinesByStudentMajorAsync(string userId)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (student == null)
                return Enumerable.Empty<DisciplineReadDto>();

            var disciplines = await _context.Grades
                .Where(g => g.Student.Major == student.Major)
                .Select(g => g.Discipline)
                .Distinct()
                .Select(d => new DisciplineReadDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Semester = d.Semester,
                    Credits = d.Credits,
                    TeacherId = d.TeacherId
                })
                .ToListAsync();

            return disciplines;
        }



        public async Task<DisciplineResponseDto> CreateAsync(DisciplineCreateDto dto)
        {
            var discipline = new Discipline
            {
                Name = dto.Name,
                Semester = dto.Semester,
                Credits = dto.Credits,
                TeacherId = dto.TeacherId
            };

            _context.Disciplines.Add(discipline);
            await _context.SaveChangesAsync();

            return new DisciplineResponseDto
            {
                Id = discipline.Id,
                Name = discipline.Name,
                Semester = discipline.Semester,
                Credits = discipline.Credits,
                TeacherId = discipline.TeacherId
            };
        }

        public async Task<bool> UpdateAsync(int id, DisciplineUpdateDto dto, ClaimsPrincipal user)
        {
            var discipline = await _context.Disciplines
                .Include(d => d.Teacher)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (discipline == null)
                return false;

            var appUser = await _userManager.GetUserAsync(user);
            var roles = await _userManager.GetRolesAsync(appUser);

            // 🟢 Admin → всичко позволено
            if (!roles.Contains("Admin"))
            {
                // 🔵 Teacher → само своите дисциплини
                if (!roles.Contains("Teacher"))
                    return false;

                var teacher = await _context.Teachers
                    .FirstOrDefaultAsync(t => t.UserId == appUser.Id);

                if (teacher == null || discipline.TeacherId != teacher.Id)
                    return false;
            }

            discipline.Name = dto.Name;
            discipline.Semester = dto.Semester;
            discipline.Credits = dto.Credits;
            discipline.TeacherId = dto.TeacherId;

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteAsync(int id)
        {
            var discipline = await _context.Disciplines.FindAsync(id);
            if (discipline == null)
                return false;

            discipline.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
