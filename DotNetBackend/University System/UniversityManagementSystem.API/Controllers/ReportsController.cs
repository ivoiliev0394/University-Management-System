using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using University_System.UniversityManagementSystem.Core.Interfaces;
using University_System.UniversityManagementSystem.Core.Models.ReportsDtos;

namespace University_System.UniversityManagementSystem.API.Controllers
{
    [Authorize]
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
        public async Task<ActionResult<StudentReportDto>> GetStudentTranscript([FromRoute][Range(1, int.MaxValue)] int studentId)
        {
            var result = await _reportService.GetStudentTranscriptAsync(studentId);

            if (result == null)
                return NotFound();

            return Ok(result);

        }

        // 2️⃣ Среден успех за дисциплина
        // GET: api/reports/discipline-average/3
        [HttpGet("discipline-average/{disciplineId}")]
        public async Task<ActionResult<DisciplineAverageDto>> GetAverageByDiscipline([FromRoute][Range(1, int.MaxValue)] int disciplineId)
        {
            var result = await _reportService.GetAverageGradeByDisciplineAsync(disciplineId);

            if (result == null)
                return NotFound("No grades for this discipline");

            return Ok(result);
        }

        // 3️⃣ Среден успех по специалност и курс
        // GET: api/reports/average-by-major-course?major=Software Engineering&course=3
        [HttpGet("average-by-major-course")]
        public async Task<ActionResult<List<StudentAverageDto>>> GetAverageByMajorAndCourse( [FromQuery] AverageByMajorCourseRequestDto request)
        {
            var result = await _reportService.GetAveragesByMajorAndCourseAsync(
                request.Major,
                request.Course);

            return Ok(result);
        }


        // 4️⃣ Top 3 отличници по дисциплина
        // GET: api/reports/top-students/2
        [HttpGet("top-students/{disciplineId}")]
        public async Task<ActionResult<List<TopStudentDto>>> GetTopStudentsByDiscipline(int disciplineId)
        {
            var result = await _reportService.GetTopStudentsByDisciplineAsync(disciplineId);
            return Ok(result);
        }

        // 5️⃣ Студенти с успех над 5.00 за дипломна
        // GET: api/reports/eligible-for-diploma?major=Software Engineering
        [HttpGet("eligible-for-diploma")]
        public async Task<ActionResult<IEnumerable<DiplomaEligibleStudentDto>>> GetEligibleForDiploma([FromQuery] string major)
        {
            var result = await _reportService.GetEligibleForDiplomaAsync(major);
            return Ok(result);
        }
    }
}
