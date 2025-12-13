using Microsoft.AspNetCore.Mvc;

namespace University_System.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("OK");
        }
    }
}
