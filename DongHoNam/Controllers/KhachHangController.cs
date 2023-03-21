using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Controllers
{
    public class KhachHangController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: KhachHang
        public ActionResult DangKy()
        {
            return View();
        }
        [HttpPost]
        public ActionResult DangKy(KhachHangDangKyModelView KH)
        {
            if(ModelState.IsValid)
            {
                if(db.KHACHHANGs.SingleOrDefault(x=>x.EMAIL==KH.EMAIL)!=null)
                {
                    ModelState.AddModelError("", "Đã tồn tại email");
                    return View();
                }
                KHACHHANG nKH = new KHACHHANG();
                nKH.EMAIL = KH.EMAIL;
                nKH.HOTEN = KH.HOTEN;
                nKH.SDT = KH.SDT;
                nKH.PASSWORD = KH.PASSWORD;
                // LƯU TRÊN CSDL
                db.KHACHHANGs.Add(nKH);
                db.SaveChanges();
                // Luu vao session
                Session["KH"] = nKH;
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        public ActionResult DangNhap()
        {
            return View();
        }
        [HttpPost]
        public ActionResult DangNhap(KhachHangDangNhapModelView KH)
        {
            if(ModelState.IsValid)
            {
                KHACHHANG nKH = db.KHACHHANGs.SingleOrDefault(x => x.EMAIL == KH.EMAIL && x.PASSWORD == KH.PASSWORD);
                if (nKH != null)
                {
                    Session["KH"] = nKH;
                    return RedirectToAction("Index", "SanPham");
                }
                else
                    ModelState.AddModelError("", "Đăng nhập thất bại. Tên đăng nhập hoặc mật khảu chưa đúng");
            }
            return View();
        }
        public ActionResult DangXuat()
        {
            Session.Remove("KH");
            return RedirectToAction("Index", "Home");
        }
    }
}