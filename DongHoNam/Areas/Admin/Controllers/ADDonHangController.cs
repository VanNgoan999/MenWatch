using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Areas.Admin.Controllers
{
    [Authorize]
    public class ADDonHangController : Controller
    {
        // GET: Admin/ADDon
        WatchDB db = new WatchDB();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult getALL()
        {
            var THs = db.DONHANGs.Select(x => new { x.MADH, KHACHHANG = x.KHACHHANG.HOTEN, NGAYDAT = x.NGAYDAT.ToString(), x.TRANGTHAI, x.DIACHINHAN});
            return Json(THs, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DoiTrangThai(int ID)
        {
            DONHANG dh = db.DONHANGs.Find(ID);
            if (dh.TRANGTHAI)
                dh.TRANGTHAI = false;
            else
                dh.TRANGTHAI = true;
            db.Entry(dh).State = System.Data.Entity.EntityState.Modified;
           int kq= db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int ID)
        {
            var dh = db.DONHANGs.Find(ID);
            
            db.DONHANGs.Remove(dh);
            int kq = db.SaveChanges();            
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getbyID(int ID)
        {
            var ctdh = db.CTDONHANGs.Where(x => x.MADH == ID).Select(x => new
            {
                x.MADH,
                x.MASP,
                TENSP = x.SANPHAM.TENSP,
                x.SANPHAM.GIA,
                HINH = x.SANPHAM.HINH,
                SL = x.SOLUONG,
                x.THANHTIEN
            });
            return Json(ctdh,JsonRequestBehavior.AllowGet);
        }
    }
}