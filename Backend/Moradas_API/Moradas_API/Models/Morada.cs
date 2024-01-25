using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Moradas_API.Models
{
    public class Morada
    {
        [Key]
        [Required] public int id { get; set; }
        [Required] public string nome { get; set; }
        [Required] public string rua { get; set; }
        [Required] public string numero { get; set; }
        [Required] public string freguesia { get; set; }
        [Required] public string concelho { get; set; }
        [Required] public string distrito { get; set; }
        [Required] public string pais { get; set; }
        [Required] public string codigo_postal { get; set; }
        public string coordenadas { get; set; }
       

    }
}
