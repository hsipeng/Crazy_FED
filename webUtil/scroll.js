var page=1;
var page_is_end=false;//标记是否还能继续动态加载
getCityInit();//查看cookie中用户是否指定城市
//获取招聘信息
function getRecruitInfo(now_city) {
    $.ajax({
        type: "post",
        url: "servlet/RecruitServlet?method=getRecruitByPage&page="+page+"&now_city="+encodeURIComponent(now_city),//这里必须进行转码，中文才能正常传输
        dataType: "json",
        success: function (data, textStatus) {
        		if(data[0].length==0){
        			page_is_end = true;//如果数据库查询为空，则不再进行加载
        			$("#loading").text("没有更多数据啦！");
        		}else{
        			page_is_end=false;
            		for(var i=0;i<data[0].length;i++){
                		var li1 = '<li class="list-group-item" style="text-align: left ">';
                		var li2 = '<p style="font-size: 12px">'+data[0][i].r_school+ '</p>';
                		var li3 = '<a href="context.html?r_id='+data[0][i].r_id+'" style="font-size: 18px ;font-weight: bold">'+data[0][i].r_title+'</a>';
                		var li4 = '<p style="font-size: 12px">'+ data[0][i].r_time+'&nbsp;<span id="star'+data[0][i].r_id+'" class="glyphicon glyphicon-star-empty star" onclick="collect(id)" aria-hidden="true"></span></p>';
                		$("#recruit_ul").append(li1+li2+li3+li4);
            		}
            		$("#loading").hide();
        		}

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            this; // 调用本次AJAX请求时传递的options参数
        }
    });
}


////下拉动态加载
$(window).scroll(function () {
	var now_city = $.cookie('now_city');//从cookie中提取当前城市
    //当内容滚动到底部时加载新的内容
    if ($(this).scrollTop() + $(window).height() + 20 >= $(document).height() && $(this).scrollTop() > 5) {
        if (!page_is_end)//如果没有到底，继续加载
        {
        	$("#loading").show();
        	page_is_end=true;
        	page++;
        	getRecruitInfo(now_city);
        }
    }
});


/*返回上次浏览位置*/
$(function () {
var str = window.location.href;
str = str.substring(str.lastIndexOf("/") + 1);
if ($.cookie(str)) {

$("html,body").animate({ scrollTop: $.cookie(str) }, 1000);
}
else {
}
})

$(window).scroll(function () {
var str = window.location.href;
str = str.substring(str.lastIndexOf("/") + 1);
var top = $(document).scrollTop();
$.cookie(str, top, { path: '/' });
return $.cookie(str);
})
