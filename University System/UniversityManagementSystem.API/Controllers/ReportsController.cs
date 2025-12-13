using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using University_System.UniversityManagementSystem.Core.Interfaces;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportsController(IReportService reportService)
        {
            _reportService = reportService;
        }

        // 1️⃣ Академична справка за студент
        // GET: api/reports/student/5
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetStudentTranscript(int studentId)
        {
            var student = await _reportService.GetStudentTranscriptAsync(studentId);

            if (student == null)
                return NotFound();

            return Ok(student);
        }

        // 2️⃣ Среден успех за дисциплина
        // GET: api/reports/discipline-average/3
        [HttpGet("discipline-average/{disciplineId}")]
        public async Task<IActionResult> GetAverageByDiscipline(int disciplineId)
        {
            var avg = await _reportService.GetAverageGradeByDisciplineAsync(disciplineId);

            if (avg == null)
                return NotFound("No grades for this discipline");

            return Ok(avg);
        }

        // 3️⃣ Среден успех по специалност и курс
        // GET: api/reports/average-by-major-course?major=Software Engineering&course=3
        [HttpGet("average-by-major-course")]
        public async Task<IActionResult> GetAverageByMajorAndCourse(
            [FromQuery] string major,
            [FromQuery] int course)
        {
            var result = await _reportService.GetAveragesByMajorAndCourseAsync(major, course);

            return Ok(result.Select(r => new
            {
                Student = $"{r.Student.FirstName} {r.Student.LastName}",
                r.Average
            }));
        }

        // 4️⃣ Top 3 отличници по дисциплина
        // GET: api/reports/top-students/2
        [HttpGet("top-students/{disciplineId}")]
        public async Task<IActionResult> GetTopStudentsByDiscipline(int disciplineId)
        {
            var result = await _reportService.GetTopStudentsByDisciplineAsync(disciplineId);

            return Ok(result.Select(r => new
            {
                Student = $"{r.Student.FirstName} {r.Student.LastName}",
                Grade = r.Grade
            }));
        }

        // 5️⃣ Студенти с успех над 5.00 за дипломна
        // GET: api/reports/eligible-for-diploma?major=Software Engineering
        [HttpGet("eligible-for-diploma")]
        public async Task<IActionResult> GetEligibleForDiploma([FromQuery] string major)
        {
            var result = await _reportService.GetEligibleForDiplomaAsync(major);

            return Ok(result.Select(r => new
            {
                Student = $"{r.Student.FirstName} {r.Student.LastName}",
                r.Average
            }));
        }
    }
}
