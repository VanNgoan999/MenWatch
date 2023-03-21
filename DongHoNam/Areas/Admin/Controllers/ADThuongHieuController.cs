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
    public class ADThuongHieuController : Controller
    {
        // GET: Admin/ADThuongHieu
        WatchDB db = new WatchDB();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult getALL()
        {
            var THs = db.THUONGHIEUx.Select(x => new {x.MATH,x.TENTH,x.LOGO,x.NAMTL,x.QUOCGIA,x.MOTA });
            return Json(THs, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]        
        public ActionResult Add(THUONGHIEU th)
        {
            

            db.THUONGHIEUx.Add(th);
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult Edit(THUONGHIEU th)
        {


            db.Entry(th).State = EntityState.Modified;
            int kq = db.SaveChanges();
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int ID)
        {
            var th = db.THUONGHIEUx.Find(ID);
            var path = Server.MapPath("~/image-Thuonghieu/" + th.LOGO);
            db.THUONGHIEUx.Remove(th);
            int kq = db.SaveChanges();
            if(System.IO.File.Exists(path))
                System.IO.File.Delete(path);
            return Json(kq, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getbyID(int ID)
        {
            var th= db.THUONGHIEUx.Find(ID);
            var kq = new {MATH=th.MATH,TENTH=th.TENTH,LOGO=th.LOGO,NAMTL=th.NAMTL,QUOCGIA=th.QUOCGIA,MOTA=th.MOTA };
            return Json(kq, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult LuuAnh()
        {
            HttpPostedFileBase LOGOTH = Request.Files[0];
            //Upload hinh
             
            if (LOGOTH.ContentLength > 0 && LOGOTH != null)
            {
                string filename = LOGOTH.FileName;
                if (filename.Length > 45)
                    filename = filename.Substring(filename.Length-45,45);
                
                var path = Server.MapPath("~/image-Thuonghieu/" + filename);
                LOGOTH.SaveAs(path);
            }
            return Json(LOGOTH.FileName, JsonRequestBehavior.AllowGet);
        }
    }
}