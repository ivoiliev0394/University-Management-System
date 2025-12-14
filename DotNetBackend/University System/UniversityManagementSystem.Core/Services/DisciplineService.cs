using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class DisciplineService : IDisciplineService
    {
        private readonly UniversityIdentityDbContext _context;

        public DisciplineService(UniversityIdentityDbContext context)
        {
            _context = context;
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

        public async Task<int> CreateAsync(DisciplineCreateDto dto)
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

            return discipline.Id;
        }

        public async Task<bool> UpdateAsync(int id, DisciplineUpdateDto dto)
        {
            var discipline = await _context.Disciplines.FindAsync(id);
            if (discipline == null)
                return false;

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
