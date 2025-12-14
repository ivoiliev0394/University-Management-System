using University_System.UniversityManagementSystem.Core.Entities;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;

namespace University_System.UniversityManagementSystem.Core.Interfaces
{
    public interface IReportService
    {
        Task<StudentReportDto?> GetStudentTranscriptAsync(int studentId);

        Task<DisciplineAverageDto?> GetAverageGradeByDisciplineAsync(int disciplineId);

        Task<List<StudentAverageDto>> GetAveragesByMajorAndCourseAsync(string major, int course);

        Task<List<TopStudentDto>> GetTopStudentsByDisciplineAsync(int disciplineId, int top = 3);

        Task<List<DiplomaEligibleStudentDto>> GetEligibleForDiplomaAsync(string major, decimal minAverage = 5.00m);
    }
}
