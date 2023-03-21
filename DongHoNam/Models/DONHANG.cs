namespace DongHoNam.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DONHANG")]
    public partial class DONHANG
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DONHANG()
        {
            CTDONHANGs = new HashSet<CTDONHANG>();
        }

        [Key]
        public int MADH { get; set; }

        public int MAKH { get; set; }

        public DateTime NGAYDAT { get; set; }

        public bool TRANGTHAI { get; set; }

        [Required(ErrorMessage ="Chưa nhập địa chỉ nhận")]
        [StringLength(50)]
        public string DIACHINHAN { get; set; }

        [StringLength(256)]
        public string GHICHU { get; set; }

        public decimal TONG { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CTDONHANG> CTDONHANGs { get; set; }

        public virtual KHACHHANG KHACHHANG { get; set; }
    }
}
