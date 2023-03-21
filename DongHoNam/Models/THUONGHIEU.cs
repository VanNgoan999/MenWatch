namespace DongHoNam.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("THUONGHIEU")]
    public partial class THUONGHIEU
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public THUONGHIEU()
        {
            SANPHAMs = new HashSet<SANPHAM>();
        }

        [Key]
        public int MATH { get; set; }

        [Required]
        [StringLength(50)]
        public string TENTH { get; set; }

        [Required]
        [StringLength(50)]
        public string QUOCGIA { get; set; }

        public int NAMTL { get; set; }

        [Required]
        [StringLength(50)]
        public string LOGO { get; set; }

        [StringLength(256)]
        public string MOTA { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SANPHAM> SANPHAMs { get; set; }
    }
}
