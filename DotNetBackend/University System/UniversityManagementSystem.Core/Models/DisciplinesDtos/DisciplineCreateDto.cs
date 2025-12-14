using System.ComponentModel.DataAnnotations;

namespace University_System.UniversityManagementSystem.Core.Models.DisciplinesDtos
{
    public class DisciplineCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [Range(1, 10)]
        public int Semester { get; set; }

        [Range(1, 30)]
        public int Credits { get; set; }

        [Required]
        public int TeacherId { get; set; }
    }
}
