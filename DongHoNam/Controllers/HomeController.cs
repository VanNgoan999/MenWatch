using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Controllers
{
    public class HomeController : Controller
    {
        WatchDB db = new WatchDB();
        public ActionResult Index()
        {
            var dsSANPHAM = db.SANPHAMs.OrderByDescending(x => x.NGAYNHAP).Take(12).ToList();
            
            return View(dsSANPHAM);
        }
        public ActionResult GioiThieu()
        {
            return View();
        }
        public ActionResult Search(string search = "")
        {
            var dsSP = db.SANPHAMs.Where(x => x.TENSP.ToUpper().Contains(search.ToUpper())
                    || x.LOAI.TENLOAI.ToUpper().Contains(search.ToUpper()))
                    .Select(x => new { Ten = x.TENSP, Hinh = x.HINH, Gia = x.GIA, Ma = x.MASP });
                
            
            return Json(dsSP, JsonRequestBehavior.AllowGet);

        }


    }
}