using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Controllers
{
    public class GioHangController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: GioHang
        public ActionResult AddToCart(int ID_Sanpham)
        {
            GioHang gio =Get_GIOHANG();
            //Lay thong tin san pham tu database
            SANPHAM sp = db.SANPHAMs.Find(ID_Sanpham);
            //them vaof gio hang
            gio.AddSP(sp, 1);
            return RedirectToAction("ViewCart");
        }
        public ActionResult ViewCart()
        {
            GioHang gio = Get_GIOHANG();
            return View(gio);
        }

        public ActionResult UpdateCart(int[] ID_Sanpham, int[] SoLuong)
        {
            //lấy giỏ hàng từ Session
            GioHang gio = Get_GIOHANG();
            //duyet qua cac ma san pham trong mang
            for (int i = 0; i < ID_Sanpham.Length; i++)
            {
                //truy van thong tin san pham them ma san pham
                SANPHAM sp = db.SANPHAMs.Find(ID_Sanpham[i]);
                //goi ham cap nhat so luong cho san pham tuong ung
                gio.UpdateSP(sp, SoLuong[i]);
            }
            return RedirectToAction("ViewCart");
        }
        
        public GioHang Get_GIOHANG()
        {
            GioHang gio = (GioHang)Session["GioHang"];
            if(gio==null)
            {
                gio = new GioHang();
                Session["GioHang"] = gio;
            }
            return gio;
        }
        [HttpGet]
        public ActionResult Checkout()
        {
            
            if (Session["KH"] == null)
                return RedirectToAction("DangNhap", "KhachHang");
            ViewBag.KhachHang = (KHACHHANG)Session["KH"];
            ViewBag.GioHang = Get_GIOHANG();
            return View();
        }
        [HttpPost]
        public ActionResult Checkout(DONHANG DH)
        {
            if(!ModelState.IsValid)
            {
                ViewBag.KhachHang = (KHACHHANG)Session["KH"];
                ViewBag.GioHang = Get_GIOHANG();
                return View();
            }
            GioHang GH = (GioHang)Session["GioHang"];
            KHACHHANG KH = Session["KH"] as KHACHHANG;
            DH.MAKH = KH.MAKH;
            DH.NGAYDAT = DateTime.Now;
            DH.TRANGTHAI = false;
            DH.TONG = (decimal)GH.Tongtien_GH;
            db.DONHANGs.Add(DH);            
            foreach(var item in GH.Items)
            {
                CTDONHANG CTDH = new CTDONHANG();
                CTDH.MASP = item.SANPHAM.MASP;
                CTDH.MADH = DH.MADH;
                CTDH.SOLUONG = item.SoLuong;
                CTDH.THANHTIEN = item.TongTien;
                db.CTDONHANGs.Add(CTDH);
            }
            
          
            db.SaveChanges();

            Session["TB"] = "a";
            Session.Remove("GioHang");
            
            return RedirectToAction("Index", "SanPham");
        }
    }
}