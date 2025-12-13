using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class ReportService : IReportService
    {
        private readonly UniversityIdentityDbContext _context;

        public ReportService(UniversityIdentityDbContext context)
        {
            _context = context;
        }

        public async Task<Student?> GetStudentTranscriptAsync(int studentId)
        {
            return await _context.Students
                .Include(s => s.Grades)
                    .ThenInclude(g => g.Discipline)
                .FirstOrDefaultAsync(s => s.Id == studentId);
        }

        public async Task<decimal?> GetAverageGradeByDisciplineAsync(int disciplineId)
        {
            var query = _context.Grades.Where(g => g.DisciplineId == disciplineId);

            if (!await query.AnyAsync())
                return null;

            return await query.AverageAsync(g => g.Value);
        }

        public async Task<List<(Student Student, decimal Average)>> GetAveragesByMajorAndCourseAsync(string major, int course)
        {
            // среден успех за всеки студент от дадена специалност + курс, сортирано намаляващо
            var result = await _context.Students
                .Where(s => s.Major == major && s.Course == course)
                .Select(s => new
                {
                    Student = s,
                    Avg = s.Grades.Any() ? s.Grades.Average(g => g.Value) : 0m
                })
                .OrderByDescending(x => x.Avg)
                .ToListAsync();

            return result.Select(x => (x.Student, x.Avg)).ToList();
        }

        public async Task<List<(Student Student, decimal Grade)>> GetTopStudentsByDisciplineAsync(int disciplineId, int top = 3)
        {
            var topStudents = await _context.Grades
                .Where(g => g.DisciplineId == disciplineId)
                .Include(g => g.Student)
                .OrderByDescending(g => g.Value)
                .ThenBy(g => g.Date)
                .Take(top)
                .Select(g => new { g.Student, Grade = g.Value })
                .ToListAsync();

            return topStudents.Select(x => (x.Student, x.Grade)).ToList();
        }

        public async Task<List<(Student Student, decimal Average)>> GetEligibleForDiplomaAsync(string major, decimal minAverage = 5.00m)
        {
            var result = await _context.Students
                .Where(s => s.Major == major)
                .Select(s => new
                {
                    Student = s,
                    Avg = s.Grades.Any() ? s.Grades.Average(g => g.Value) : 0m
                })
                .Where(x => x.Avg > minAverage)
                .OrderByDescending(x => x.Avg)
                .ToListAsync();

            return result.Select(x => (x.Student, x.Avg)).ToList();
        }
    }
}
