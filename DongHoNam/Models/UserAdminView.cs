using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace DongHoNam.Models
{
    public class UserAdminView
    {
        [Required(ErrorMessage ="Chưa nhập tài khoản")]
        [StringLength(32)]
        public string username { get; set; }

        [Required(ErrorMessage = "Chưa nhập mật khẩu")]
        [StringLength(50)]
        public string password { get; set; }
    }
}