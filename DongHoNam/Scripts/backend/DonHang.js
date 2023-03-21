/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready(Chạy hàm loadData dau tien)
$(document).ready(function () {
    loadDH();
});

//Load Data function
function loadDH() {
    $.ajax({
        url: "/ADDonHang/getALL",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.MADH + '</td>';
                html += '<td>' + item.KHACHHANG + '</td>';
                html += '<td>' + item.NGAYDAT + ' </td>';
                if (item.TRANGTHAI)
                {
                    html += '<td class="text-center"><a onclick="TrangThai(' + item.MADH + ')">'
                      + '<i class="glyphicon glyphicon-ok-sign text-success"></i></a>';
                } else
                {

                    html += '<td class="text-center"><a onclick="TrangThai(' + item.MADH + ')">'
                      + '<i class="glyphicon glyphicon-remove-sign text-danger"></i></a>';
                }               
                html += '<td>' + item.DIACHINHAN + '</td>';
                html += '<td>';
                html += ' <a href="#" class="btn btn-danger" onclick="Delele(' + item.MADH + ')"><i class="glyphicon glyphicon-trash"></i> Xóa</a> | ';
                html += '<a href="#" onclick="Detail(' + item.MADH + ')" class="btn btn-default">Chi tiết</a>    </td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function TrangThai(ID)
{           
       
            $.ajax({
                url: "/ADDonHang/DoiTrangThai/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    loadDH();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        
    
}
function Delele(ID) {
    var ans = confirm("Dữ liệu sẽ bị mất, bạn chắc chắn muốn xóa?");
    if (ans) {
        $.ajax({
            url: "/ADDonHang/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadDH();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function Detail(ID) {
    $('#Main').hide();
    $('#detail').show();
    $.ajax({
        url: "/ADDonHang/getbyID/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            html += '<div class="row text-left"><b>Mã đơn hàng: </b>' + result[0].MADH+ ' </div>';
            html += '<table class="table table-bordered table-hover">';
            html += '<thead>'
               + '<tr class="black">'
                  
                
                + '   <th>'
                + '       Tên sản phẩm'
                + '   </th>'
                + '   <th>'
                + '      Hình ảnh'
                + '   </th>'
                + '   <th>'
                + '      Số lượng'
                + '   </th>'
                + '   <th>'
                + '       Đơn giá'
                + '   </th>'
                + '   <th> Thành tiền'

                + '   </th>'

               + '</tr>'
          + ' </thead>'
          + ' <tbody>';
            var TTG=0;
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.TENSP + '</td>';
                html += '<td><img src="/image-sanpham/' + item.HINH + '" style="width:120px" /> </td>';
                html += '<td>' + item.SL + '</td>';
                html += '<td>' + item.GIA + ' </td>';
                html += '<td>' + item.THANHTIEN + '</td>';
                TTG += item.THANHTIEN;
            });
           
            html += ' <t/body></table>';
            html += '<div class="row"><div class="col-md-6 text-left"><a href="#" onclick="BACK();" class="btn btn-info">Quay lại</a></div>'
                +'<div class="col-md-6 text-right text-info"><b>Tổng trị giá đơn hàng: </b>' + TTG + 'VNĐ </div></div>';
            $('#detail').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function BACK()
{
    $('#Main').show();
    $('#detail').hide();
    loadDH();
}
