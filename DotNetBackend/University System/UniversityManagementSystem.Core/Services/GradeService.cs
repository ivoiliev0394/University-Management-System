using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.GradesDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class GradeService : IGradeService
    {
        private readonly UniversityIdentityDbContext _context;

        public GradeService(UniversityIdentityDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GradeReadDto>> GetAllAsync()
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Select(g => new GradeReadDto
                {
                    Id = g.Id,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }

        public async Task<GradeReadDto?> GetByIdAsync(int id)
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Where(g => g.Id == id)
                .Select(g => new GradeReadDto
                {
                    Id = g.Id,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .FirstOrDefaultAsync();
        }

        public async Task<int> CreateAsync(GradeCreateDto dto)
        {
            var grade = new Grade
            {
                StudentId = dto.StudentId,
                DisciplineId = dto.DisciplineId,
                Value = dto.Value,
                Date = dto.Date
            };

            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();

            return grade.Id;
        }

        public async Task<bool> UpdateAsync(int id, GradeUpdateDto dto)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null) return false;

            grade.StudentId = dto.StudentId;
            grade.DisciplineId = dto.DisciplineId;
            grade.Value = dto.Value;
            grade.Date = dto.Date;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null) return false;

            grade.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<GradeReadDto>> GetByStudentAsync(int studentId)
        {
            return await _context.Grades
                .Where(g => g.StudentId == studentId)
                .Include(g => g.Discipline)
                .Select(g => new GradeReadDto
                {
                    Id = g.Id,
                    StudentName = "",
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<GradeReadDto>> GetByDisciplineAsync(int disciplineId)
        {
            return await _context.Grades
                .Where(g => g.DisciplineId == disciplineId)
                .Include(g => g.Student)
                .Select(g => new GradeReadDto
                {
                    Id = g.Id,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineName = "",
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }
    }
}
