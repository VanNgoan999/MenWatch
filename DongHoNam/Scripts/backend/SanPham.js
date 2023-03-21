/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready(Chạy hàm loadData dau tien)
$(document).ready(function () {
    loadSP(1);
});

//Load Data function
function loadSP(page) {
    var str = $('#searchSP').val();
    var chuoi = "";
    if (str.trim() != "")
    {
        chuoi = "/ADSanPham/GETALL/?str=" +str;
    } else
    {
        chuoi = "/ADSanPham/GETALL";
    }
    $.ajax({
        url: chuoi,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var count = result.length;
                var pageNumber = page;
                var pageSize = 15;
                var pageMax = count / pageSize + ((count % pageSize == 0) ? 0 : 1);
                var start=(pageNumber - 1) * pageSize;
                var mang = result.slice(start, start + pageSize);
                html += '              <table class="table table-bordered table-hover">';
                html += '                  <thead>';
                html += '                      <tr class="black">';
                html += '                          <th>';
  html += '                             Mã sản phảm';
  html += '                          </th>';
  html += '                          <th>';
  html += '                             Tên sản phẩm';
  html += '                         </th>';
  html += '                       <th>';
  html += '                             Hình';
  html += '                          </th>';
  html += '              <th>';
  html += '                 Giá';
  html += '                     </th>';
  html += '                          <th>';
  html += '                               Ngày nhập';
  html += '                             </th>';
  html += '                            <th>';

  html += '                             </th>';

  html += '                         </tr>';
  html += '                     </thead>';
  html += '                     <tbody>';

            $.each(mang, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.MASP + '</td>';
                html += '<td>' + item.TENSP + '</td>';
                html += '<td> <img src="/image-sanpham/' + item.HINH + '" style="width:75px" /> </td>';
                html += '<td>' + item.GIA + '</td>';
                html += '<td>' + item.NGAYNHAP + '</td>';
                html += '<td class="text-center"><a href="#" class="btn btn-black"  onclick="getbyID(' + item.MASP + ')"><i class="glyphicon glyphicon-pencil"></i> Sửa</a> |';
                html += ' <a href="#" class="btn btn-danger" onclick="Delele(' + item.MASP + ')"><i class="glyphicon glyphicon-trash"></i> Xóa</a> | ';
                html += '<a href="#" class="btn btn-default" onclick="Detail('+item.MASP+')">Chi tiết</a>    </td>';
                html += '</tr>';
            });
            html += '</tbody>';
            html += '              </table>';
            html += '<div class="row text-center">';
            if (pageNumber > 1) {
                html += '<a onclick="loadSP(' + (pageNumber - 1) + ')" class="btn btn-black"><<</a>';
            }
            for (var i = 2; i < pageMax ; i++) {
                html += '<a onclick="loadSP(' + i + ')" class="btn btn-black">' + i + '</a>';
            }
            if (pageNumber < pageMax-1) {
                html += '<a onclick="loadSP(' + (pageNumber + 1) + ')" class="btn btn-black">>></a>';
            }
       
            html += '</div>';
            $('#table').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Luu anh
function LuuAnh() {
    var dt = new FormData();
    var hinh = $('#HINH')[0].files[0];


    dt.append("HINHSP", hinh);
    var xhs = new XMLHttpRequest();
    xhs.open("POST", "/ADSanPham/LuuAnh");
    xhs.send(dt);
    return false;

    
}
//Add Data Function 
function Add() {
    var res = validate();
    var resb=validateADD();
    
    if (res == false||resb==false) {
        return false;
    }

    var filename = $('#HINH')[0].files[0].name;    
    if (filename.length > 45)
    {
        filename = filename.substr(filename.length-45, 45);
    }
    var ngaynhap=new Date($('#nam').val(),$('#thang').val(),$('#ngay').val())
    var empObj = {
        MASP: $('#txtMaSP').val(),
        TENSP: $('#txtTenSP').val(),
        HINH: filename,
        MATH: $('#thuonghieu').val(),
        MALOAI: $('#loaidongho').val(),
        NGAYNHAP: ngaynhap,
        MOTA: $('#txtMoTa').val(),
        MAUSAC: $('#txtMauSac').val(),
        CHATLIEU: $('#txtChatLieu').val(),
        CHONGNUOC: $('#txtChongNuoc').val(),
        GIA: $('#txtGia').val(),
        NANGLUONG: $('#txtNangLuong').val(),
    };
    $.ajax({
        url: "/ADSanPham/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            LuuAnh();
            loadSP(1);
            $('#SPModal').modal('hide');
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    
}


//Function for getting the Data Based upon Employee ID
function getbyID(ID) {
    $('#txtTenSP').css('border-color', 'lightgrey');
    $('#loaidongho').css('border-color', 'lightgrey');
    $('#HINH').css('border-color', 'lightgrey');
    $('#thuonghieu').css('border-color', 'lightgrey');
    $('#ngay').css('border-color', 'lightgrey');
    $('#thang').css('border-color', 'lightgrey');
    $('#nam').css('border-color', 'lightgrey');
    $('#gia').css('border-color', 'lightgrey');
    CBO_Loai();
    CBO_ThuongHieu();
    $.ajax({
        url: "/ADSanPham/getbyID/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#imgSP').show();
            $('#imgSP').attr('src', '/image-sanpham/' + result.HINH);
            $('#tenhinh').val(result.HINH);
            $('#txtMaSP').val(result.MASP);
            $('#txtTenSP').val(result.TENSP);            
           
            $('#loaidongho').val(result.MALoai);
            
            $('#thuonghieu').val(result.MATh);
            DMY();
            $('#ngay').val(result.NGAY);
            $('#thang').val(result.THANG-1);
            $('#nam').val(result.NAM);
            $('#txtMauSac').val(result.MAU);
            $('#txtChatLieu').val(result.CHATLIEU);
            $('#txtNangLuong').val(result.NANGLUONG);
            $('#txtChongNuoc').val(result.CHONGNUOC);            
            $('#txtMoTa').val(result.MOTA);
            $('#txtGia').val(result.GIA);
            //
            $('#SPModal').modal('show');            
            $('#btnSua').show();
            $('#btnThem').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
   
}

//function for updating employee's record
function Update() {
    
    var res = validate();
    if (res == false) {
        return false;
    }
    var filename="";
     
    if ($('#HINH').val().trim() == "") {
        filename = $('#tenhinh').val();
    }else{filename= $('#HINH')[0].files[0].name;}
    if (filename.length > 45)
    {
        filename = filename.substr(filename.length-45, 45);
    }
    var ngaynhap = new Date($('#nam').val(), $('#thang').val(), $('#ngay').val())
    var empObj = {
        MASP: $('#txtMaSP').val(),
        TENSP: $('#txtTenSP').val(),
        HINH: filename,
        MATH: $('#thuonghieu').val(),
        MALOAI: $('#loaidongho').val(),
        NGAYNHAP: ngaynhap,
        MOTA: $('#txtMoTa').val(),
        MAUSAC: $('#txtMauSac').val(),
        CHATLIEU: $('#txtChatLieu').val(),
        CHONGNUOC: $('#txtChongNuoc').val(),
        GIA: $('#txtGia').val(),
        NANGLUONG: $('#txtNangLuong').val(),
    };
    $.ajax({
        url: "/ADSanPham/Edit",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($('#HINH')[0].files[0] != null) {
                LuuAnh();
            }
           
            $('#SPModal').modal('hide');
            loadSP(1);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for deleting employee's record
function Delele(ID) {
    var ans = confirm("Dữ liệu sẽ bị mất, bạn chắc chắn muốn xóa?");
    if (ans) {
        $.ajax({
            url: "/ADSanPham/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadSP(1);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    
    $('#txtMaSP').val("");
    $('#txtTenSP').val("");
    $('#HINH').val(null);
    CBO_Loai();
    $('#loaidongho').val(0);
    CBO_ThuongHieu();
    $('#thuonghieu').val(0);
    DMY();
    $('#ngay').val(0); $('#thang').val(-1); $('#nam').val(0);
    $('#txtMauSac').val("");
    $('#txtChatLieu').val("");
    $('#txtNangLuong').val("");
    $('#txtChongNuoc').val("");
    $('#imgSP').hide();
    $('#txtMoTa').val("");
    $('#btnSua').hide();
    $('#btnThem').show();
    $('#txtTenSP').css('border-color', 'lightgrey');
    $('#txtNgayNhap').css('border-color', 'lightgrey');
    $('#txtGia').css('border-color', 'lightgrey');
    $('#HINH').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    
    var isValid = true;
    
    if ($('#txtTenSP').val().trim() == "") {
        $('#txtTenSP').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTenSP').css('border-color', 'lightgrey');
    }
    
    
    
    
    if ($('#txtGia').val().trim() == "" || !$('#txtGia').val().match(/^[0-9]+$/)) {
        $('#txtGia').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtGia').css('border-color', 'lightgrey');
    }
    
    if ($('#txtChongNuoc').val().trim() != "" && !$('#txtChongNuoc').val().match(/^[0-9]+$/)) {
        $('#txtChongNuoc').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtChongNuoc').css('border-color', 'lightgrey');
    }
    return isValid;
}
function validateADD()
{
    var res=true;
    if ($('#HINH').val().trim() == "") {
        $('#HINH').css('border-color', 'Red');
        res = false;
    }
    else {
        $('#HINH').css('border-color', 'lightgrey');}

        if ($('#loaidongho').val() ==0) {
            $('#loaidongho').css('border-color', 'Red');
            res = false;
        }
        else {
            $('#loaidongho').css('border-color', 'lightgrey');
        }

        if ($('#thuonghieu').val() ==0) {
            $('#thuonghieu').css('border-color', 'Red');
            res = false;
        }
        else {
            $('#thuonghieu').css('border-color', 'lightgrey');
        }

        if ($('#ngay').val() ==0) {
            $('#ngay').css('border-color', 'Red');
            res = false;
        }
        else {
            $('#ngay').css('border-color', 'lightgrey');
        }

        if ($('#thang').val() ==-1) {
            $('#thang').css('border-color', 'Red');
            res = false;
        }
        else {
            $('#thang').css('border-color', 'lightgrey');
        }

        if ($('#nam').val() ==0) {
            $('#nam').css('border-color', 'Red');
            res = false;
        }
        else {
            $('#nam').css('border-color', 'lightgrey');
        }
        return res;
    }
    // Khởi tạo cbo
    function CBO_Loai() {
        $.ajax({
            url: "/ADSanPham/getALLLoai",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '<option value="0">Chọn loại đồng hồ</option>';
                $.each(result, function (key, item) {
                    html += '<option value="' + item.MALOAI + '"> '+item.TENLOAI+'</option>';      
                 
                });
                $('#loaidongho').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        }); return false;
    }
    function CBO_ThuongHieu() {
        $.ajax({
            url: "/ADSanPham/getALLTH",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '<option value="0">Chọn loại thương hiệu</option>';
                $.each(result, function (key, item) {
                    html += '<option value="' + item.MATH + '">' + item.TENTH +'</option>';

                });
                $('#thuonghieu').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        }); return false;
    }
    function DMY() {
        var htmln = '<option value="0">Ngày</option>';
        for(let a=1;a<=31;a++)
        {
            htmln += '<option value="'+a+'">'+a+'</option>';
        } $('#ngay').html(htmln);

        var htmlt = '<option value="-1">Tháng</option>';
        for (let a = 0; a <= 11; a++) {
            htmlt += '<option value="' + a + '">Tháng ' + (a+1) + '</option>';
        } $('#thang').html(htmlt);
    
        var htmly = '<option value="0">Năm</option>';
        for (let a = 2000; a <= 2050; a++) {
            htmly += '<option value="' + a + '">' + a + '</option>';
        } $('#nam').html(htmly);
    }
    function Detail(ID) {
        $('#Main').hide();
        $('#detail').show();
        $.ajax({
            url: "/ADSanPham/getbyID/" + ID,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                html += '<div class="row container text-left"><a href="#" onclick="BACK();" class="btn btn-info">Quay lại</a></div>';
                html+='        <div class="container panel-primary" style="margin-top:5px">';
                html+='         <div class="text-center panel-heading"><h3>'+result.TENSP+' </h3></div>';
                html+='        <div class="row panel-body">';
                html+='        <div class="text-center col-md-6"><img src="/image-sanpham/'+result.HINH+'" style="max-width:400px" /></div>';
                html+='             <div class="col-md-6" style="font-size:medium">';
                html+='    <div class="text-left"><b>Giá:</b> '+result.GIAFORTMAT+' VNĐ</div>';
                html+='    <div class="text-left"><b>Ngày nhập:</b> '+result.NGAYNHAP+'</div>';
                html += '    <div class="text-left"><b>Màu sắc:</b>' + result.MAU + '</div>';
                html += '<div class="text-left"><b>Thương hiệu:</b> ' + result.TENTH + '</div>';
                html += '           <div class="text-left"><b>Xuất xứ:</b> ' + result.XUATXU + '</div>';
                html += '<div class="text-left"><b>Năng lượng:</b> ' + result.NANGLUONG + '</div>';
                html += '         <div class="text-left"><b>Chống nước:</b>' + result.CHONGNUOC + ' M</div>          ';
                
                html+='       </div>';
                html+='    </div>';
                html += '  </div>';
                
                    
                $('#detail').html(html);
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    function BACK() {
        $('#Main').show();
        $('#detail').hide();
        loadSP(1);
    }