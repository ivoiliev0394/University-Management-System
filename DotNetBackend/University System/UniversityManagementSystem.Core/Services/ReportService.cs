using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;
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
        //----------------------------1
        public async Task<StudentReportDto?> GetStudentTranscriptAsync(int studentId)
        {
            return await _context.Students
        .Where(s => s.Id == studentId)
        .Select(s => new StudentReportDto
        {
            Id = s.Id,
            FacultyNumber = s.FacultyNumber,
            FullName = s.FirstName + " " + s.LastName,
            Major = s.Major,
            Course = s.Course,
            Grades = s.Grades.Select(g => new StudentGradeDto
            {
                Discipline = g.Discipline.Name,
                Value = g.Value,
                Date = g.Date
            }).ToList()
        })
        .FirstOrDefaultAsync();
        }
        //----------------------------2
        public async Task<DisciplineAverageDto?> GetAverageGradeByDisciplineAsync(int disciplineId)
        {
            var discipline = await _context.Disciplines
                .Include(d => d.Grades)
                .FirstOrDefaultAsync(d => d.Id == disciplineId);

            if (discipline == null || !discipline.Grades.Any())
                return null;

            return new DisciplineAverageDto
            {
                DisciplineId = discipline.Id,
                Discipline = discipline.Name,
                AverageGrade = discipline.Grades.Average(g => g.Value)
            };
        }
        //----------------------------3
        // среден успех за всеки студент от дадена специалност + курс, сортирано намаляващо
        public async Task<List<StudentAverageDto>> GetAveragesByMajorAndCourseAsync(string major,int course)
        {
            return await _context.Students
                .Where(s => s.Major == major && s.Course == course)
                .Select(s => new StudentAverageDto
                {
                    Student = s.FirstName + " " + s.LastName,
                    Average = s.Grades.Any()
                        ? s.Grades.Average(g => g.Value)
                        : 0m
                })
                .OrderByDescending(x => x.Average)
                .ToListAsync();
        }
        //----------------------------4
        public async Task<List<TopStudentDto>> GetTopStudentsByDisciplineAsync(int disciplineId,int top = 3)
        {
            return await _context.Grades
                .Where(g => g.DisciplineId == disciplineId)
                .Include(g => g.Student)
                .OrderByDescending(g => g.Value)
                .ThenBy(g => g.Date)
                .Take(top)
                .Select(g => new TopStudentDto
                {
                    Student = g.Student.FirstName + " " + g.Student.LastName,
                    Grade = g.Value
                })
                .ToListAsync();
        }
        //----------------------------5
        public async Task<List<DiplomaEligibleStudentDto>> GetEligibleForDiplomaAsync(string major,decimal minAverage = 5.00m)
        {
            return await _context.Students
                .Where(s => s.Major == major)
                .Select(s => new
                {
                    FullName = s.FirstName + " " + s.LastName,
                    Avg = s.Grades.Any()
                        ? s.Grades.Average(g => g.Value)
                        : 0m
                })
                .Where(x => x.Avg >= minAverage)
                .OrderByDescending(x => x.Avg)
                .Select(x => new DiplomaEligibleStudentDto
                {
                    Student = x.FullName,
                    Average = x.Avg
                })
                .ToListAsync();
        }
    }
}
