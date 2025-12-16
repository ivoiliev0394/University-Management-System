using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> _userManager;
        public StudentService(UniversityIdentityDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
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

        public async Task<StudentResponseDto> CreateAsync(StudentCreateDto dto)
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

            // 2️⃣ Assign Student role
            await _userManager.AddToRoleAsync(user, "Student");

            // 3️⃣ Create Student profile
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
                UserId = user.Id
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return new StudentResponseDto
            {
                Id = student.Id,
                FacultyNumber = student.FacultyNumber,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email
            };
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
