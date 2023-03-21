namespace DongHoNam.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;


    [Table("UAD")]
    public partial class UAD
    {          
        [Key]        
        [StringLength(32)]
        public string username { get; set; }

        [Required]
        [StringLength(50)]
        public string password { get; set; }             
    }
}
