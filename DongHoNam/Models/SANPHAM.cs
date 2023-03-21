namespace DongHoNam.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SANPHAM")]
    public partial class SANPHAM
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SANPHAM()
        {
            CTDONHANGs = new HashSet<CTDONHANG>();
           
        }

        [Key]
        public int MASP { get; set; }

        public int MATH { get; set; }

        public int MALOAI { get; set; }

        [Required]
        [StringLength(100)]
        public string TENSP { get; set; }

        public int GIA { get; set; }

        [Required]
        [StringLength(50)]
        public string HINH { get; set; }

        public DateTime NGAYNHAP { get; set; }

        [StringLength(256)]
        public string MOTA { get; set; }

        [StringLength(20)]
        public string MAUSAC { get; set; }

        [StringLength(20)]
        public string CHATLIEU { get; set; }

        [StringLength(50)]
        public string NANGLUONG { get; set; }

        public int? CHONGNUOC { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CTDONHANG> CTDONHANGs { get; set; }

        public virtual LOAI LOAI { get; set; }

        public virtual THUONGHIEU THUONGHIEU { get; set; }
    }
}
