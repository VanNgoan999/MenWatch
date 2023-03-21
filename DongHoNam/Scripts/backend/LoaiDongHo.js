/// <reference path="jquery-1.9.1.intellisense.js" />
//Load Data in Table when documents is ready(Chạy hàm loadData dau tien)
$(document).ready(function () {
    loadDL();
});

//Load Data function
function loadDL() {
    $.ajax({
        url: "/ADLoaiSanPham/getALL",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.MALOAI + '</td>';
                html += '<td>' + item.TENLOAI + '</td>';
                html += '<td class="text-center"><a class="btn btn-black" href="#" onclick="return getbyID(' + item.MALOAI + ')"><i class="glyphicon glyphicon-pencil"></i> Sửa</a> |';
                html += ' <a href="#" class="btn btn-danger" onclick="Delele(' + item.MALOAI + ')"><i class="glyphicon glyphicon-trash"></i> Xóa</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function 
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        MALOAI: $('#txtMaLoai').val(),
        TENLOAI: $('#txtTenLoai').val()
    };
    $.ajax({
        url: "/ADLoaiSanPham/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDL();
            $('#loaiModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for getting the Data Based upon Employee ID
function getbyID(ID) {
    $('#txtMaLoai').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ADLoaiSanPham/getbyID/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#txtMaLoai').val(result.MALOAI);
            $('#txtTenLoai').val(result.TENLOAI);
            $('#loaiModal').modal('show');
            $('#btnSua').show();
            $('#btnThem').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        MALOAI: $('#txtMaLoai').val(),
        TENLOAI: $('#txtTenLoai').val()
    };
    $.ajax({
        url: "/ADLoaiSanPham/Edit",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDL();
            $('#loaiModal').modal('hide');
            $('#txtMaLoai').val("");
            $('#txtTenLoai').val("");
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
            url: "/ADLoaiSanPham/Delete/" + ID,
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
    $('#txtMaLoai').val("");
    $('#txtTenLoai').val("");
    $('#Age').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#btnSua').hide();
    $('#btnThem').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}
//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#txtTenLoai').val().trim() == "") {
        $('#txtTenLoai').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#txtTenLoai').css('border-color', 'lightgrey');
    }
    return isValid;
}