using Microsoft.AspNetCore.Identity;
using University_System.UniversityManagementSystem.Core.Entities;

namespace University_System.UniversityManagementSystem.Infrastructure.Seed
{
    public class IdentitySeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();

            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            await SeedRolesAsync(roleManager);
            await SeedAdminAsync(userManager);
            await SeedTeachersAsync(userManager);
            await SeedStudentsAsync(userManager);
        }

        // ======================================================
        // ===================== ROLES ==========================
        // ======================================================

        private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            string[] roles = { "Admin", "Teacher", "Student" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        // ======================================================
        // ===================== USERS ==========================
        // ======================================================

        private static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager)
        {
            await CreateUserIfNotExistsAsync(
                userManager,
                email: "admin@uni.com",
                password: "Admin123!",
                role: "Admin"
            );
        }

        private static async Task SeedTeachersAsync(UserManager<ApplicationUser> userManager)
        {
            for (int i = 1; i <= 5; i++)
            {
                await CreateUserIfNotExistsAsync(
                    userManager,
                    email: $"teacher{i}@uni.com",
                    password: "Teacher123!",
                    role: "Teacher"
                );
            }
        }

        private static async Task SeedStudentsAsync(UserManager<ApplicationUser> userManager)
        {
            for (int i = 1; i <= 10; i++)
            {
                await CreateUserIfNotExistsAsync(
                    userManager,
                    email: $"student{i}@uni.com",
                    password: "Student123!",
                    role: "Student"
                );
            }
        }

        // ======================================================
        // ===================== HELPER =========================
        // ======================================================

        private static async Task CreateUserIfNotExistsAsync(
            UserManager<ApplicationUser> userManager,
            string email,
            string password,
            string role)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user != null) return;

            user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {
                if (!await userManager.IsInRoleAsync(user, role))
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }
    }
}
