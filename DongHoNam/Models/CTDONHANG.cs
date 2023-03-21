namespace DongHoNam.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CTDONHANG")]
    public partial class CTDONHANG
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MADH { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MASP { get; set; }

        public int? SOLUONG { get; set; }

        public double? THANHTIEN { get; set; }

        public virtual DONHANG DONHANG { get; set; }

        public virtual SANPHAM SANPHAM { get; set; }
    }
}
