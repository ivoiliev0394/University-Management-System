using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using University_System.UniversityManagementSystem.Core.Entities;

namespace University_System.UniversityManagementSystem.Infrastructure.Data
{
    public class UniversityIdentityDbContext 
    : IdentityDbContext<ApplicationUser>
    {
        public UniversityIdentityDbContext(DbContextOptions<UniversityIdentityDbContext> options)
            : base(options) { }

        public DbSet<Student> Students => Set<Student>();
        public DbSet<Teacher> Teachers => Set<Teacher>();
        public DbSet<Discipline> Disciplines => Set<Discipline>();
        public DbSet<Grade> Grades => Set<Grade>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // STUDENT
            // =========================
            modelBuilder.Entity<Student>()
                .HasIndex(s => s.FacultyNumber)
                .IsUnique();

            // =========================
            // GRADE
            // =========================

            modelBuilder.Entity<Grade>()
                .HasIndex(g => new { g.StudentId, g.DisciplineId })
                .IsUnique();

            modelBuilder.Entity<Grade>()
                .Property(g => g.Value)
                .HasPrecision(3, 2);

            // Grade → Student (CASCADE)
            modelBuilder.Entity<Grade>()
                .HasOne(g => g.Student)
                .WithMany(s => s.Grades)
                .HasForeignKey(g => g.StudentId)
                .OnDelete(DeleteBehavior.Restrict); // ❌ без cascade

            // Grade → Discipline (CASCADE)
            modelBuilder.Entity<Grade>()
                .HasOne(g => g.Discipline)
                .WithMany(d => d.Grades)
                .HasForeignKey(g => g.DisciplineId)
                .OnDelete(DeleteBehavior.Restrict); // ❌ без cascade

            // =========================
            // DISCIPLINE → TEACHER
            // =========================

            modelBuilder.Entity<Discipline>()
                .HasOne(d => d.Teacher)
                .WithMany(t => t.Disciplines)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.Cascade);

            // =========================
            // SOFT DELETE GLOBAL FILTERS
            // =========================
            modelBuilder.Entity<Student>().HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<Teacher>().HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<Discipline>().HasQueryFilter(e => !e.IsDeleted);
            modelBuilder.Entity<Grade>().HasQueryFilter(e => !e.IsDeleted);

        }
    }
    
    
}
