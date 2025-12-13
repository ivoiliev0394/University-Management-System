using University_System.UniversityManagementSystem.Core.Entities;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IReportService
    {
        Task<Student?> GetStudentTranscriptAsync(int studentId);

        Task<decimal?> GetAverageGradeByDisciplineAsync(int disciplineId);

        Task<List<(Student Student, decimal Average)>> GetAveragesByMajorAndCourseAsync(string major, int course);

        Task<List<(Student Student, decimal Grade)>> GetTopStudentsByDisciplineAsync(int disciplineId, int top = 3);

        Task<List<(Student Student, decimal Average)>> GetEligibleForDiplomaAsync(string major, decimal minAverage = 5.00m);
    }
}
