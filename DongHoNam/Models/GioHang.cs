using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DongHoNam.Models
{
    public class GioHang
    {
        private List<GioHangITEM> _ITEMs;
        public GioHang()
        {
            _ITEMs = new List<GioHangITEM>();
        }
        public List<GioHangITEM> Items
        {
            get { return _ITEMs; }
        }
        public void AddSP(SANPHAM sp,int Soluong)
        {
            // Kiem tra xem ton tai sp nay chua
            GioHangITEM IT = Items.Find(x => x.SANPHAM.MASP==sp.MASP);
            if (IT == null)//chua
                Items.Add(new GioHangITEM { SANPHAM = sp, SoLuong = Soluong });
            else //cos roi
                //tang so luong
                IT.SoLuong += Soluong;
        }
        public void UpdateSP(SANPHAM sp,int soluong)
        {
            GioHangITEM IT = Items.Find(x => x.SANPHAM.MASP == sp.MASP);
            if(IT!=null)
            {
                if (soluong > 0)
                    IT.SoLuong += soluong;
                else
                    Items.Remove(IT);
            }
        }
        public void DeleteSP(SANPHAM p)
        {
           GioHangITEM item = Items.Find(x => x.SANPHAM.MASP == p.MASP);
            if (item != null)
            {
                Items.Remove(item);
            }
        }
        public double Tongtien_GH
        {
            get
            {
                double sum = 0;
                foreach (GioHangITEM x in Items)
                {
                    sum += x.TongTien;
                }
                //  sum = Items.Sum(x => x.Total);
                return sum;
            }
        }
    }
    public class GioHangITEM
    {
        public SANPHAM SANPHAM { get; set; }
        public int SoLuong { get; set; }
        public double TongTien { get { return SANPHAM.GIA * SoLuong; } }

    }
}