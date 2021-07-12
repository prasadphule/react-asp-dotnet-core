using System.ComponentModel.DataAnnotations;

namespace Sample.Entity
{
    public class ObjectType
    {

        public int ObjectTypeId { get; set; }
        
        [Required]
        public string ObjectTypeName { get; set; }
        
        public string Description { get; set; }

        [Required]
        [Range(1, 5)]
        public int Level { get; set; }
    }
}
