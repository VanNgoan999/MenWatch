using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;
using DongHoNam.Models;
using System.Web.Security;

namespace DongHoNam.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
       
        WatchDB db = new WatchDB();
        // GET: Admin/Account
        
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(UserAdminView user)
        {
            if (ModelState.IsValid)
            {
                string passmh = mahoa(user.password);
                UAD nuser = db.UADs.SingleOrDefault(x=>x.username==user.username&&x.password==passmh);
               

                if (nuser!=null)
                {
                    FormsAuthentication.SetAuthCookie(nuser.username, true);
                    return RedirectToAction("Index", "ADHome");
                }
                else
                {
                    ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu chưa đúng");                    
                }
            }
            return View();
        }

        public string mahoa(string password)
        {
            //tao md5
            MD5 md5 = MD5.Create();
            //chuoi -> kieu byte
            byte[] chuoi_input = System.Text.Encoding.ASCII.GetBytes(password);
            // max hoas chuoior daxd chuyener
            byte[] chuoi_hash = md5.ComputeHash(chuoi_input);
            //taoj doiods tuongwj stringbuilder lafm viecej voiws kieeur duwx lieuje lonws
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < chuoi_hash.Length; i++)
            {
                sb.Append(chuoi_hash[i].ToString("x2"));
            }
            return sb.ToString();
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "ADHome", new { @area = "" });
        }
    }
   
}