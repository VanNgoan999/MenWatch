using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DongHoNam.Models;

namespace DongHoNam.Controllers
{
    public class SanPhamController : Controller
    {
        WatchDB db = new WatchDB();
        // GET: SanPham
        public ActionResult Index(int ?page, int ?ID_Loai, int ?ID_ThuongHieu, string search="")
        {
            
           
            var count = db.SANPHAMs.ToList().Count();
            int pageSize = 12;
            int pageNumber = page ?? 1;
            var pageMax = count / pageSize + (count%pageSize==0?0:1);
            ViewBag.pageMax = pageMax;
            ViewBag.pageNumber = pageNumber;
            ViewBag.Tieude = "Danh sách sản phẩm";
            var dsSANPHAM = db.SANPHAMs.OrderBy(x=>x.MASP).Skip((pageNumber-1)*pageSize).Take(pageSize).ToList();
            if (ID_Loai!=null)
            {
                dsSANPHAM = db.SANPHAMs.Where(x => x.MALOAI == ID_Loai).OrderBy(x=>x.MALOAI)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                ViewBag.Tieude = db.LOAIs.Find(ID_Loai).TENLOAI;
            }
            
            if (ID_ThuongHieu != null)
            {
                dsSANPHAM = db.SANPHAMs.Where(x => x.MATH == ID_ThuongHieu).OrderBy(x=>x.MATH)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                ViewBag.Tieude = db.THUONGHIEUx.Find(ID_ThuongHieu).TENTH;
            }
            return View(dsSANPHAM);
        }
        public ActionResult Detail(int ID_Sanpham)
        {
            WatchDB db = new WatchDB();
            var SP = db.SANPHAMs.Find(ID_Sanpham);
            return View(SP);
        }
    }
}