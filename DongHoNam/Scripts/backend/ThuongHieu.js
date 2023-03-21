/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready(Chạy hàm loadData dau tien)
$(document).ready(function () {
    loadDL();
});

//Load Data function
function loadDL() {
    $.ajax({
        url: "/ADThuongHieu/getALL",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.MATH + '</td>';
                html += '<td>' + item.TENTH + '</td>';
                html += '<td> <img src="/image-Thuonghieu/' + item.LOGO + '" style="width:75px" /> </td>';
                html += '<td>' + item.NAMTL + '</td>';
                html += '<td>' + item.QUOCGIA + '</td>';
                html += '<td class="text-center"><a href="#" class="btn btn-black"  onclick="getbyID(' + item.MATH + ')"><i class="glyphicon glyphicon-pencil"></i> Sửa</a> |';
                html += ' <a href="#" class="btn btn-danger" onclick="Delele(' + item.MATH + ')"><i class="glyphicon glyphicon-trash"></i> Xóa</a> | ';
                html += '<a href="#" onclick="Detail(' + item.MATH + ')" class="btn btn-default">Chi tiết</a>    </td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// Luu anh
function LuuAnh() {
    var dt = new FormData();
    var hinh = $('#F_logo')[0].files[0];


    dt.append("LOGOTH", hinh);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/ADThuongHieu/LuuAnh");
    xhr.send(dt);
    return false;

    
}
//Add Data Function 
function Add() {
    var res = validate();
    if ($('#F_logo').val().trim() == "") {
        $('#F_logo').css('border-color', 'Red');
       res = false;
    }
    else {
        $('#F_logo').css('border-color', 'lightgrey');
    }
    if (res == false) {
        return false;
    }

    var filename = $('#F_logo')[0].files[0].name;    
    if (filename.length > 45)
    {
        filename = filename.substr(filename.length-45, 45);
    }
    var empObj = {
        MATH: $('#txtMaTH').val(),
        TENTH: $('#txtTenTH').val(),
        LOGO: filename,
        NAMTL: $('#txtNamTL').val(),
        QUOCGIA: $('#txtQuocGia').val(),
        MOTA: $('#txtMoTa').val()
    };
    $.ajax({
        url: "/ADThuongHieu/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            LuuAnh();
            loadDL();
            $('#THModal').modal('hide');
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    
}


//Function for getting the Data Based upon Employee ID
function getbyID(ID) {
    $('#txtMaTH').css('border-color', 'lightgrey');
    $('#txtTenTH').css('border-color', 'lightgrey');
    $('#F_logo').css('border-color', 'lightgrey');
    $('#txtQuocGia').css('border-color', 'lightgrey');
    $('#txtNamTL').css('border-color', 'lightgrey');
    $('#txtMoTa').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ADThuongHieu/getbyID/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtMaTH').val(result.MATH);
            $('#txtTenTH').val(result.TENTH);            
            $('#imgth').show();
            $('#imgth').attr('src', '/image-Thuonghieu/' + result.LOGO);           
            $('#tenhinh').val(result.LOGO);
            $('#txtNamTL').val(result.NAMTL);
            $('#txtQuocGia').val(result.QUOCGIA);
            $('#txtMoTa').val(result.MOTA);
            $('#THModal').modal('show');            
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
     
    if ($('#F_logo').val().trim() == "") {
        filename = $('#tenhinh').val();
    }else{filename= $('#F_logo')[0].files[0].name;}
    if (filename.length >45)
    {
        filename = filename.substr(filename.length-45, 45);
    }
   
    var empObj = {
        MATH: $('#txtMaTH').val(),
        TENTH: $('#txtTenTH').val(),
        LOGO: filename,
        NAMTL: $('#txtNamTL').val(),
        QUOCGIA: $('#txtQuocGia').val(),
        MOTA: $('#txtMoTa').val()
    };
    $.ajax({
        url: "/ADThuongHieu/Edit",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if ($('#F_logo')[0].files[0] != null) {
                LuuAnh();
            }
            loadDL();
            $('#THModal').modal('hide');
            
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
            url: "/ADThuongHieu/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadDL();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#txtMaTH').val("");
    $('#txtTenTH').val("");
    $('#txtNamTL').val("");
    $('#txtQuocGia').val("");
    $('#F_logo').val(null);
    $('#imgth').hide();
    $('#txtMoTa').val("");
    $('#btnSua').hide();
    $('#btnThem').show();
    $('#txtTenTH').css('border-color', 'lightgrey');
    $('#txtNamTL').css('border-color', 'lightgrey');
    $('#txtQuocGia').css('border-color', 'lightgrey');
    $('#F_logo').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    // Tên thương hiệu
    if ($('#txtTenTH').val().trim() == "") {
        $('#txtTenTH').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTenTH').css('border-color', 'lightgrey');
    }
    //Logo
    
    
    //Năm thành lập
    if ($('#txtNamTL').val().trim() == "" || !$('#txtNamTL').val().match(/^[0-9]+$/)) {
        $('#txtNamTL').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtNamTL').css('border-color', 'lightgrey');
    }
    // Quốc gia
    if ($('#txtQuocGia').val().trim() == "") {
        $('#txtQuocGia').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtQuocGia').css('border-color', 'lightgrey');
    }
    return isValid;
}
function Detail(ID) {
    $('#Main').hide();
    $('#detail').show();
    $.ajax({
        url: "/ADThuongHieu/getbyID/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            html += '<div class="row container text-left"><a href="#" onclick="BACK();" class="btn btn-info">Quay lại</a></div>';
            html += '            <div class="container panel-primary" style="margin-top:5px">';
            html += '     <div class="text-center panel-heading"><h3>'+result.TENTH+' </h3></div>';
            html += '     <div class="row panel-body">';
            html += '         <div class="text-center col-md-7"><img src="/image-Thuonghieu/' + result.LOGO + '" style="max-width:450px"/></div>';
            html += '             <div class="col-md-5" style="font-size:medium">';            
            html += '                 <div class="text-left"><b>Năm thành lập:</b>' + result.NAMTL + '</div>';
            html += '                 <div class="text-left"><b>Quốc gia:</b>' + result.QUOCGIA + '</div>';
            html += '                <div class="text-left"><b>Mô tả:</b>' + result.MOTA + '</div> <br /> ';
            html += '            </div>';
            html += '            </div>';
            html += '    </div>';


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
    loadTH();
}