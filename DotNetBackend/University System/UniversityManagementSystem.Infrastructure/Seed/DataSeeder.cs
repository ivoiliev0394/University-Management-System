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

            // SEED ONLY IF EMPTY
            if (!context.Teachers.Any())
            {
                var teachers = await SeedTeachersAsync(context, userManager);
                var disciplines = await SeedDisciplinesAsync(context, teachers);
                var students = await SeedStudentsAsync(context, userManager);
                await SeedGradesAsync(context, students, disciplines);
            }
        }

        // ======================================================
        // TEACHERS
        // ======================================================
        private static async Task<List<Teacher>> SeedTeachersAsync(
            UniversityIdentityDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            var teacherData = new[]
            {
            ("Ivan Ivanov", "Prof.", "Computer Science"),
            ("Petar Petrov", "Assoc. Prof.", "Software Engineering"),
            ("Maria Dimitrova", "Prof.", "Information Systems"),
            ("Georgi Georgiev", "Assist. Prof.", "Computer Science"),
            ("Elena Nikolova", "Prof.", "Artificial Intelligence")
        };

            var teachers = new List<Teacher>();

            for (int i = 0; i < teacherData.Length; i++)
            {
                var email = $"teacher{i + 1}@uni.com";
                var user = await userManager.FindByEmailAsync(email);
                if (user == null) continue;

                teachers.Add(new Teacher
                {
                    Name = teacherData[i].Item1,
                    Title = teacherData[i].Item2,
                    Phone = $"08881234{i}",
                    Email = email,
                    Department = teacherData[i].Item3,
                    UserId = user.Id
                });
            }

            context.Teachers.AddRange(teachers);
            await context.SaveChangesAsync();

            return teachers;
        }

        // ======================================================
        // DISCIPLINES
        // ======================================================
        private static async Task<List<Discipline>> SeedDisciplinesAsync(
            UniversityIdentityDbContext context,
            List<Teacher> teachers)
        {
            var disciplines = new List<Discipline>
        {
            new() { Name = "Databases", Semester = 3, Credits = 6, TeacherId = teachers[0].Id },
            new() { Name = "Web Development", Semester = 4, Credits = 6, TeacherId = teachers[1].Id },
            new() { Name = "Object-Oriented Programming", Semester = 2, Credits = 5, TeacherId = teachers[2].Id },
            new() { Name = "Algorithms and Data Structures", Semester = 3, Credits = 6, TeacherId = teachers[3].Id },
            new() { Name = "Artificial Intelligence", Semester = 5, Credits = 5, TeacherId = teachers[4].Id }
        };

            context.Disciplines.AddRange(disciplines);
            await context.SaveChangesAsync();

            return disciplines;
        }

        // ======================================================
        // STUDENTS
        // ======================================================
        private static async Task<List<Student>> SeedStudentsAsync(UniversityIdentityDbContext context, UserManager<ApplicationUser> userManager)
        {
            var studentData = new[]
            {
                ("Ivan", "Petrov", "Software Engineering", 3),
                ("Maria", "Ivanova", "Computer Science", 2),
                ("Georgi", "Dimitrov", "Information Systems", 4),
                ("Elena", "Nikolova", "Software Engineering", 3),
                ("Nikolay", "Stoyanov", "Computer Science", 1),
                ("Petya", "Georgieva", "Information Systems", 2),
                ("Daniel", "Kolev", "Software Engineering", 4),
                ("Simona", "Hristova", "Computer Science", 3),
                ("Martin", "Todorov", "Software Engineering", 2),
                ("Viktoria", "Angelova", "Information Systems", 1)
            };

            var students = new List<Student>();

            for (int i = 0; i < studentData.Length; i++)
            {
                var email = $"student{i + 1}@uni.com";
                var user = await userManager.FindByEmailAsync(email);
                if (user == null) continue;

                var (firstName, lastName, major, course) = studentData[i];

                students.Add(new Student
                {
                    FacultyNumber = $"FN2025{i + 1:00}",
                    FirstName = firstName,
                    MiddleName = "Ivanov",
                    LastName = lastName,
                    Major = major,
                    Course = course,
                    Email = email,
                    Address = "Sofia",
                    UserId = user.Id
                });
            }

            context.Students.AddRange(students);
            await context.SaveChangesAsync();

            return students;
        }


        // ======================================================
        // GRADES
        // ======================================================
        private static async Task SeedGradesAsync(
            UniversityIdentityDbContext context,
            List<Student> students,
            List<Discipline> disciplines)
        {
            var rnd = new Random();

            var grades = (
                from student in students
                from discipline in disciplines
                select new Grade
                {
                    StudentId = student.Id,
                    DisciplineId = discipline.Id,
                    Value = Math.Round((decimal)(4 + rnd.NextDouble() * 2), 2), // 4.00 – 6.00
                    Date = DateTime.UtcNow.AddDays(-rnd.Next(90))
                }
            ).ToList();

            context.Grades.AddRange(grades);
            await context.SaveChangesAsync();
        }
    }

}
