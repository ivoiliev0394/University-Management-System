using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
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

        // 🔹 CRUD

        public async Task<IEnumerable<Grade>> GetAllAsync()
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .ToListAsync();
        }

        public async Task<Grade?> GetByIdAsync(int id)
        {
            return await _context.Grades
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task CreateAsync(Grade grade)
        {
            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, Grade grade)
        {
            grade.Id = id;
            _context.Entry(grade).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var grade = await _context.Grades.FindAsync(id);
            if (grade == null) return;

            _context.Grades.Remove(grade);
            await _context.SaveChangesAsync();
        }

        // 🔹 СПРАВКИ (остават както си ги имал)

        public async Task<List<Grade>> GetGradesByStudentAsync(int studentId)
        {
            return await _context.Grades
                .Where(g => g.StudentId == studentId)
                .Include(g => g.Discipline)
                .ToListAsync();
        }

        public async Task<List<Grade>> GetGradesByDisciplineAsync(int disciplineId)
        {
            return await _context.Grades
                .Where(g => g.DisciplineId == disciplineId)
                .Include(g => g.Student)
                .ToListAsync();
        }
    }
}

