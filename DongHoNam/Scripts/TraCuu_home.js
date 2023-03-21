function loadSP(page) {
    //lay gia tri textbox tensanpham
    var ten = $('#search').val();
    $.ajax({
        url: "/Home/Search/?search=" + ten,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          
            var html = '';
            if (result.length > 0) {
                var count = result.length;
                var pageNumber = page;
                var pageSize = 12;
                var pageMax = count / pageSize + (count % pageSize == 0 ? 0 : 1);
                var start=(pageNumber - 1) * pageSize;
                var mang = result.slice(start, start + pageSize);
                html += '<div class="container">'
                $.each(mang, function (key, item) {

                    html += '      <div class="col-md-3 container" style="margin-top:50px;height:300px">';
                    html += '                     <div style="width:250px;height:30px"><b>' + item.Ten + '</b></div><br />';
                    html += '                     <div>';
                    html += '                         <a href="/SanPham/Detail/?ID_Sanpham=' + item.Ma + '">';
                    html += '                             <img src="/image-sanpham/' + item.Hinh + '" width="200px" height="200px" />';
                    html += '                         </a>';
                    html += '                     </div><br />';
                    html += '                     <div class="row">';
                    html += '                         <div class="col-md-7"><b>' + item.Gia + '. VNĐ</b></div>';
                    html += '                         <div class="col-md-5">';
                    html += '                             <a class="btn btn-danger" href="GioHang/AddToCart/?ID_Sanpham=' + item.Ma + '">Mua</a>';
                    html += '                         </div>';
                    html += '                     </div>';
                    html += '                 </div>';


                });
                html += '                 </div>';
                html += '                 <div class="text-center">';
                if(pageNumber>1)
                {
                    html+='<a onclick="loadSP('+(pageNumber-1)+')" class="btn btn-black"><<</a>';
                }
                for (var i = 2; i <pageMax ; i++)
                {
                    html += '<a onclick="loadSP(' +i + ')" class="btn btn-black">'+i+'</a>';
                }
                if (pageNumber < pageMax-1) {
                    html += '<a onclick="loadSP(' + (pageNumber + 1) + ')" class="btn btn-black">>></a>';
                }
                html += '                 </div>';
            } else
            {
                html +='<div class="row text-warning text-center"><b>Không có kết quả</b></div>'
            }
            $('#search_home').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}