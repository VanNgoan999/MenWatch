using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Areas.Admin.Controllers
{
    
    public class ADHomeController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: Admin/Default
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.KhachHang = db.KHACHHANGs.Count();
            ViewBag.SanPham = db.SANPHAMs.Count();
            ViewBag.DonHang = db.DONHANGs.Count();
            ViewBag.DoanhThu = db.DONHANGs.Sum(x => x.TONG);

            var dsDH = db.DONHANGs.OrderByDescending(x => x.NGAYDAT).Take(10);
            return View(dsDH);
        }
    }
}