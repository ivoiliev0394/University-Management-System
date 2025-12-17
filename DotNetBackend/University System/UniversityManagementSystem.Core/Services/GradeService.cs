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

        // ===================== ADMIN =====================
        public async Task<IEnumerable<GradeDetailsDto>> GetAllAsync()
        {
            return await _context.Grades
                .Where(g => !g.IsDeleted)
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Select(g => new GradeDetailsDto
                {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineId = g.DisciplineId,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }

        public async Task<GradeDetailsDto?> GetByIdAsync(int id)
        {
            var g = await _context.Grades
                .Where(x => !x.IsDeleted && x.Id == id)
                .Include(x => x.Student)
                .Include(x => x.Discipline)
                .FirstOrDefaultAsync();

            if (g == null) return null;

            return new GradeDetailsDto
            {
                Id = g.Id,
                StudentId = g.StudentId,
                StudentName = g.Student.FirstName + " " + g.Student.LastName,
                DisciplineId = g.DisciplineId,
                DisciplineName = g.Discipline.Name,
                Value = g.Value,
                Date = g.Date
            };
        }

        public async Task<int> CreateAsync(GradeCreateDto dto)
        {
            var grade = new Grade
            {
                StudentId = dto.StudentId,
                DisciplineId = dto.DisciplineId,
                Value = dto.Value,
                Date = DateTime.UtcNow
            };

            _context.Grades.Add(grade);
            await _context.SaveChangesAsync();
            return grade.Id;
        }

        public async Task<bool> UpdateAsync(int id, GradeUpdateDto dto)
        {
            var grade = await _context.Grades.FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);
            if (grade == null) return false;

            grade.StudentId = dto.StudentId;
            grade.DisciplineId = dto.DisciplineId;
            grade.Value = dto.Value;
            grade.Date = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var grade = await _context.Grades.FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);
            if (grade == null) return false;

            grade.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        // ===================== TEACHER ONLY (by discipline ownership) =====================
        public async Task<IEnumerable<GradeDetailsDto>> GetAllForTeacherAsync(string teacherUserId)
        {
            return await _context.Grades
                .Where(g => !g.IsDeleted && g.Discipline.Teacher.UserId == teacherUserId)
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Select(g => new GradeDetailsDto
                {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineId = g.DisciplineId,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }

        public async Task<GradeDetailsDto?> GetByIdForTeacherAsync(int id, string teacherUserId)
        {
            var g = await _context.Grades
                .Where(x => !x.IsDeleted && x.Id == id && x.Discipline.Teacher.UserId == teacherUserId)
                .Include(x => x.Student)
                .Include(x => x.Discipline)
                .FirstOrDefaultAsync();

            if (g == null) return null;

            return new GradeDetailsDto
            {
                Id = g.Id,
                StudentId = g.StudentId,
                StudentName = g.Student.FirstName + " " + g.Student.LastName,
                DisciplineId = g.DisciplineId,
                DisciplineName = g.Discipline.Name,
                Value = g.Value,
                Date = g.Date
            };
        }

        public async Task<bool> UpdateForTeacherAsync(int id, GradeUpdateDto dto, string teacherUserId)
        {
            var grade = await _context.Grades
                .Include(g => g.Discipline)
                .ThenInclude(d => d.Teacher)
                .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

            if (grade == null) return false;
            if (grade.Discipline.Teacher.UserId != teacherUserId) return false;

            // Teacher може да променя стойност/студент, но дисциплината НЕ е безопасно да се сменя към чужда.
            // Ако искаш да позволим смяна на дисциплина, трябва да проверим и новата дисциплина да е негова.
            grade.StudentId = dto.StudentId;
            grade.Value = dto.Value;
            grade.Date = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteForTeacherAsync(int id, string teacherUserId)
        {
            var grade = await _context.Grades
                .Include(g => g.Discipline)
                .ThenInclude(d => d.Teacher)
                .FirstOrDefaultAsync(g => g.Id == id && !g.IsDeleted);

            if (grade == null) return false;
            if (grade.Discipline.Teacher.UserId != teacherUserId) return false;

            grade.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        // ===================== FILTERS (admin/teacher use if you want) =====================
        public async Task<IEnumerable<GradeDetailsDto>> GetByStudentAsync(int studentId)
        {
            return await _context.Grades
                .Where(g => !g.IsDeleted && g.StudentId == studentId)
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Select(g => new GradeDetailsDto
                {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineId = g.DisciplineId,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<GradeDetailsDto>> GetByDisciplineAsync(int disciplineId)
        {
            return await _context.Grades
                .Where(g => !g.IsDeleted && g.DisciplineId == disciplineId)
                .Include(g => g.Student)
                .Include(g => g.Discipline)
                .Select(g => new GradeDetailsDto
                {
                    Id = g.Id,
                    StudentId = g.StudentId,
                    StudentName = g.Student.FirstName + " " + g.Student.LastName,
                    DisciplineId = g.DisciplineId,
                    DisciplineName = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                })
                .ToListAsync();
        }
    }
}
