using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;
using System.Data.Entity;
using System.Data;

namespace DongHoNam.Areas.Admin.Controllers
{
    [Authorize]
    public class ADLoaiSanPhamController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: Admin/ADLoaiSanPham
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult getALL()
        {

            var loaiS = db.LOAIs.Select(x => new { MALOAI = x.MALOAI, TENLOAI = x.TENLOAI });   
            return Json(loaiS, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Add(LOAI loai)
        {

            db.LOAIs.Add(loai);
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Edit(LOAI loai)
        {

            db.Entry(loai).State = EntityState.Modified;
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int ID)
        {

            LOAI loai = db.LOAIs.SingleOrDefault(x => x.MALOAI == ID);
            db.LOAIs.Remove(loai);
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getbyID(int? ID)
        {
            LOAI loai = db.LOAIs.Find(ID);
            var data1 = new { MALOAI = loai.MALOAI, TENLOAI = loai.TENLOAI };
            return Json(data1, JsonRequestBehavior.AllowGet);
        }
    }
}