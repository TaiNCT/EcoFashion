using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoFashionBackEnd.Entities
{
    [Table("DesignImages")]
    public class DesignImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid DesignImageId { get; set; }
        public Guid ImageId { get; set; }
        public Guid DraftId { get; set; }
        [ForeignKey(nameof(ImageId))]
        public required Image Image { get; set; }
        [ForeignKey(nameof (DraftId))]
        public required DesignDraft DesignDraft { get; set; }
    }
}
