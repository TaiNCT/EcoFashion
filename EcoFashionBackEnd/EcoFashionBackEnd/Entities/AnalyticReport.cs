using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("AnalyticReports")]
    public class AnalyticReport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ReportId { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
        [Required]
        [EnumDataType(typeof(AnalyticReportType))]
        public AnalyticReportType ReportType { get; set; }
        public string? Data { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
    public enum AnalyticReportType
    {
        Sales,
        Sustainability,
        User_Activity
    }
}
