using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.Entity;
using System.Net;
using DongHoNam.Models;

namespace DongHoNam.Areas.Admin.Controllers
{
    [Authorize]
    public class ADSanPhamController : Controller
    {
        // GET: Admin/ADThuongHieu
        WatchDB db = new WatchDB();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GETALL(string str="")
        {
            var SPs = db.SANPHAMs.Select(x => new
                    {
                        x.MASP,
                        x.TENSP,
                        x.HINH,
                        x.GIA,
                        x.MALOAI,
                        x.MATH,
                        NGAYNHAP = x.NGAYNHAP.ToString()
                    });
            if (str != null && str != "")
            {
                 SPs = db.SANPHAMs.Where(x=>x.TENSP.ToLower().Contains(str.ToLower()))
                    .Select(x => new
                {
                    x.MASP,
                    x.TENSP,
                    x.HINH,
                    x.GIA,
                    x.MALOAI,
                    x.MATH,
                    NGAYNHAP = x.NGAYNHAP.ToString()
                });
            }

            return Json(SPs, JsonRequestBehavior.AllowGet);
        }
       

        [HttpPost]
        public ActionResult Add(SANPHAM SP)
        {


            db.SANPHAMs.Add(SP);
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Edit(SANPHAM SP)
        {


            db.Entry(SP).State = EntityState.Modified;
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int ID)
        {
            var SP = db.SANPHAMs.Find(ID);
            var path = Server.MapPath("~/image-sanpham/" + SP.HINH);
            db.SANPHAMs.Remove(SP);
            int kq = db.SaveChanges();
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getbyID(int ID)
        {
            var SP = db.SANPHAMs.Find(ID);
            var kq = new {
                MASP =SP.MASP,
                TENSP =SP.TENSP,
                TENTH=SP.THUONGHIEU.TENTH,
                XUATXU=SP.THUONGHIEU.QUOCGIA,
                NGAY =SP.NGAYNHAP.Day,
                THANG =SP.NGAYNHAP.Month,
                NAM =SP.NGAYNHAP.Year,
                NGAYNHAP=SP.NGAYNHAP,
                MATh= SP.MATH,
                MALoai =SP.MALOAI,
                MOTA =SP.MOTA,
                HINH=SP.HINH,
                GIA =SP.GIA,GIAFORMAT=SP.GIA.ToString("# ### ##0"),
                MAU =SP.MAUSAC,
                CHATLIEU=SP.CHATLIEU,NANGLUONG=SP.NANGLUONG,CHONGNUOC=SP.CHONGNUOC
            };
            return Json(kq, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult LuuAnh()
        {
            HttpPostedFileBase HINHSP = Request.Files[0];
            //Upload hinh

            if (HINHSP.ContentLength > 0 && HINHSP != null)
            {
                string filename = HINHSP.FileName;
                if (filename.Length > 45)
                    filename = filename.Substring(filename.Length - 45, 45);

                var path = Server.MapPath("~/image-sanpham/" + filename);
                HINHSP.SaveAs(path);
            }
            return Json(HINHSP.FileName, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getAllLoai()
        {
            var kq = db.LOAIs.Select(x => new { x.MALOAI, x.TENLOAI });
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getAllTH()
        {
            var kq = db.THUONGHIEUx.Select(x => new { x.MATH, x.TENTH});
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
    }
}