using Microsoft.AspNetCore.Identity;
using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Infrastructure.Data;

namespace University_System.UniversityManagementSystem.Infrastructure.Seed
{
    public class DataSeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<UniversityIdentityDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            // LOCAL CACHE (за връзките)
            List<Teacher> teachers;
            List<Discipline> disciplines;
            List<Student> students;

            // ---------------- TEACHERS ----------------
            if (!context.Teachers.Any())
                teachers = await SeedTeachersAsync(context, userManager);
            else
                teachers = context.Teachers.ToList();

            // ---------------- DISCIPLINES ----------------
            if (!context.Disciplines.Any())
                disciplines = await SeedDisciplinesAsync(context, teachers);
            else
                disciplines = context.Disciplines.ToList();

            // ---------------- STUDENTS ----------------
            if (!context.Students.Any())
                students = await SeedStudentsAsync(context, userManager);
            else
                students = context.Students.ToList();

            // ---------------- GRADES ----------------
            if (!context.Grades.Any())
                await SeedGradesAsync(context, students, disciplines);
        }

        // ======================================================
        // ===================== METHODS ========================
        // ======================================================

        private static async Task<List<Teacher>> SeedTeachersAsync(
            UniversityIdentityDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            var teachers = new List<Teacher>();

            for (int i = 1; i <= 5; i++)
            {
                var user = await userManager.FindByEmailAsync($"teacher{i}@uni.com");
                if (user == null) continue;

                teachers.Add(new Teacher
                {
                    Name = $"Teacher {i}",
                    Title = "Prof.",
                    Phone = $"08880000{i}",
                    Email = user.Email!,
                    Department = "Computer Science",
                    UserId = user.Id
                });
            }

            context.Teachers.AddRange(teachers);
            await context.SaveChangesAsync();

            return teachers;
        }

        private static async Task<List<Discipline>> SeedDisciplinesAsync(
            UniversityIdentityDbContext context,
            List<Teacher> teachers)
        {
            var disciplines = new List<Discipline>
        {
            new Discipline { Name = "Databases", Semester = 3, Credits = 6, TeacherId = teachers[0].Id },
            new Discipline { Name = "Web Development", Semester = 4, Credits = 6, TeacherId = teachers[1].Id },
            new Discipline { Name = "OOP", Semester = 2, Credits = 5, TeacherId = teachers[2].Id },
            new Discipline { Name = "Algorithms", Semester = 3, Credits = 6, TeacherId = teachers[3].Id },
            new Discipline { Name = "Operating Systems", Semester = 4, Credits = 5, TeacherId = teachers[4].Id }
        };

            context.Disciplines.AddRange(disciplines);
            await context.SaveChangesAsync();

            return disciplines;
        }

        private static async Task<List<Student>> SeedStudentsAsync(
            UniversityIdentityDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            var students = new List<Student>();

            for (int i = 1; i <= 10; i++)
            {
                var user = await userManager.FindByEmailAsync($"student{i}@uni.com");
                if (user == null) continue;

                students.Add(new Student
                {
                    FacultyNumber = $"FN2025{i:00}",
                    FirstName = "Student",
                    MiddleName = "Test",
                    LastName = $"{i}",
                    Major = "Software Engineering",
                    Course = 3,
                    Email = user.Email!,
                    Address = "Sofia",
                    UserId = user.Id
                });
            }

            context.Students.AddRange(students);
            await context.SaveChangesAsync();

            return students;
        }

        private static async Task SeedGradesAsync(
            UniversityIdentityDbContext context,
            List<Student> students,
            List<Discipline> disciplines)
        {
            var rnd = new Random();
            var grades = new List<Grade>();

            foreach (var student in students)
            {
                foreach (var discipline in disciplines)
                {
                    grades.Add(new Grade
                    {
                        StudentId = student.Id,
                        DisciplineId = discipline.Id,
                        Value = Math.Round((decimal)(rnd.NextDouble() * 2 + 4), 2),
                        Date = DateTime.Now.AddDays(-rnd.Next(60))
                    });
                }
            }

            context.Grades.AddRange(grades);
            await context.SaveChangesAsync();
        }
    }
}
