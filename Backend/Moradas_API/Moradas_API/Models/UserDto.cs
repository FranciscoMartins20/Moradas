using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Moradas_API.Models
{
    public class UserDto
    {
        [Key]
        [Required] public string email { get; set; } = string.Empty;
        [Required] public string password { get; set; } = string.Empty;

    }
}
