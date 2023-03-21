using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Controllers
{
    public class ThuongHieuController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: ThuongHieu
        public ActionResult Index()
        {
            List<THUONGHIEU> dsThuongHieu = null;
            dsThuongHieu = db.THUONGHIEUx.ToList();

            return View(dsThuongHieu);
        }
        public ActionResult Detail(int ID_ThuongHieu)
        {
            
            var TH = db.THUONGHIEUx.Find(ID_ThuongHieu);
            return View(TH);
        }
    }
}