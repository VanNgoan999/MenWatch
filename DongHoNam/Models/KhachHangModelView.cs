using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace DongHoNam.Models
{
    public class KhachHangDangKyModelView
    {
        [Required(ErrorMessage ="Không được để trống")]
        [Display(Name ="HỌ TÊN")]
        public string HOTEN { get; set; }

        [Required(ErrorMessage = "Không được để trống")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string EMAIL { get; set; }
        
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string SDT { get; set; }
        [Required(ErrorMessage = "Không được để trống")]
        public string PASSWORD { get; set; }
        [Display(Name ="CONFIRM PASSWORD")]
        [Compare("PASSWORD")]
        public string CONFIRMPASSWORD { get; set; }
    }
    public class KhachHangDangNhapModelView
    {

        [Required(ErrorMessage = "Không được để trống")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string EMAIL { get; set; }

        [Required(ErrorMessage = "Không được để trống")]
        public string PASSWORD { get; set; }
        
    }

}