using System.ComponentModel.DataAnnotations;

namespace EcoFashionBackEnd.Dtos
{
    public class UserRoleModel
    {
        public int RoleId { get; set; }

        [Required]
        [StringLength(50)]
        public required string RoleName { get; set; }
    }
}
