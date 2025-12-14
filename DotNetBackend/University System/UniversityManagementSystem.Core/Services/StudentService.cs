using Microsoft.EntityFrameworkCore;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;
using University_System.UniversityManagementSystem.Core.Models.StudentsDtos;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Core.Services
{
    public class StudentService : IStudentService
    {
        private readonly UniversityIdentityDbContext _context;

        public StudentService(UniversityIdentityDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StudentListDto>> GetAllAsync()
        {
            return await _context.Students
                .Select(s => new StudentListDto
                {
                    Id = s.Id,
                    FacultyNumber = s.FacultyNumber,
                    FirstName = s.FirstName,
                    MiddleName = s.MiddleName,
                    LastName = s.LastName,
                    Major = s.Major,
                    Course = s.Course,
                    Email = s.Email
                })
                .ToListAsync();
        }

        public async Task<StudentDetailsDto?> GetByIdAsync(int id)
        {
            var student = await _context.Students
                .Include(s => s.Grades)
                    .ThenInclude(g => g.Discipline)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
                return null;

            return new StudentDetailsDto
            {
                Id = student.Id,
                FacultyNumber = student.FacultyNumber,
                FirstName = student.FirstName,
                MiddleName = student.MiddleName,
                LastName = student.LastName,
                Major = student.Major,
                Course = student.Course,
                Email = student.Email,
                Address = student.Address,
                Grades = student.Grades.Select(g => new StudentGradeDto
                {
                    Discipline = g.Discipline.Name,
                    Value = g.Value,
                    Date = g.Date
                }).ToList()
            };
        }

        public async Task<int> CreateAsync(StudentCreateDto dto)
        {
            var student = new Student
            {
                FacultyNumber = dto.FacultyNumber,
                FirstName = dto.FirstName,
                MiddleName = dto.MiddleName,
                LastName = dto.LastName,
                Major = dto.Major,
                Course = dto.Course,
                Email = dto.Email,
                Address = dto.Address,
                UserId = dto.UserId
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return student.Id;
        }
        public async Task<bool> UpdateAsync(int id, StudentUpdateDto dto)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return false;

            student.FacultyNumber = dto.FacultyNumber;
            student.FirstName = dto.FirstName;
            student.MiddleName = dto.MiddleName;
            student.LastName = dto.LastName;
            student.Major = dto.Major;
            student.Course = dto.Course;
            student.Email = dto.Email;
            student.Address = dto.Address;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return false;

            student.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
