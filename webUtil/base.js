var baseUrl = "http://localhost:8080/XXXX/";
var src = "";
var fixParam={key:"af170c124230fc5472c3e993e932567922ce8c35",timestamp:new Date().getTime(),"iswebsite":2};


/*
 * post请求
 * */
$.postAjax = function(url, param, fnCallback, fnErrorCallback) {
	url = baseUrl + url;
	param = param || {};
	param = $.extend(param, fixParam);
	if (fnCallback && typeof fnCallback == "function") {
		$.post(url, param, function(json, status) {
					if (status == "success") {
						var data = JSON.parse(json);
						fnCallback(data);
					} else if (fnErrorCallback
							&& typeof fnErrorCallback == "function") {
						fnErrorCallback();
					}
		});
	}
};

/*get请求*/
$.getAjax = function(url, param, fnCallback, fnErrorCallback) {
	url = baseUrl + url;
	param = param || {};
	param = $.extend(param, fixParam);
	if (fnCallback && typeof fnCallback == "function") {
		$.get(url, param,
				function(json, status) {
					var data = JSON.parse(json);
					if (status == "success") {
						fnCallback(data);
					} else if (fnErrorCallback
							&& typeof fnErrorCallback == "function") {
						fnErrorCallback(data);
					}
				})
	}
};

var util = {
	convertTime:function(key){
		key = key.replace(/\-/g, "/");
		return key;
	}
	,
	getParam : function(key) {
		var search = window.location.search;
		if (!search)
			return "";
		var params = search.substring(1).split("&");
		for ( var index in params) {
			var param = params[index].split("=");
			if (param[0] == key)
				return param[1];
		}
		return "";
	},
	validateParam:function(params){
		var bool=true;
		 var datas=$.trim(params).split("&");
	     for(var i in datas){
	    	 var  data =datas[i];
	         if(data.length < 1) {
	           bool&=false;
	         } else {
	           bool&=true;
	         }
	     }
	   return bool;
	},
	/*
	 * 获取form序列化后的字段值
	 * */
	formParam : function(key) {
		var obj = {};
		var params = key.split("&");
		for ( var i in params) {
			var param = params[i].split("=");
			for ( var j in param) {
				obj[param[0]] = param[1];
			}
		}
		return obj;
	},


	/*
	 * 验证130-139,150-159,180-189号码段的手机号码
	 * */
	phoneValidation : function(ss) {
		var re;
		re = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if (re.test(ss)) {
			return true;
		} else {
			return false;
		}
	},


	/*
	 * 验证邮箱
	 * */
	emailValidation : function(ss) {
		var re;
		var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;//邮箱;
		if (re.test(ss)) {
			return true;
		} else {
			return false;
		}
	},

	/*
	 * 只能输入英文字母小数点苏子，和-
	 * 不能输入汉字
	 * */
	letterValidation : function(ss) {
		var re;
		re = /^[^\u4e00-\u9fa5]{0,}$/;
		if (re.test(ss)) {
			return true;
		} else {
			return false;
		}
	},


	/**
	 * 判断字符是否为空
	 */
	nullValidation:function(ss){
		var re;
		re =  /^$/;
		if(re.test(ss)){
			return true;
		}else{
			return false;
		}
	},

	/**
	 * 判断0-40个字符长度
	 */
	CharalenValidation:function(ss){
		var re;
		re = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,40}/;
		if(re.test(ss)){
			return true;
		}else{
			return false;
		}
	},



	/*
	 * 验证6-16位密码，只包含数字，大写字母，小写字母
	 * */
	passwordValidation : function(ss) {
		var re;
		re = /^[a-zA-Z0-9]{6,16}$/;
		if (re.test(ss)) {
			return true;
		} else {
			return false;
		}
	},
	/*
	 * 验证6位验证码，只包含0-9位数字
	 * */
	captchaValidation : function(ss) {
		var re;
		re = /^\d{6}$/;
		if (re.test(ss)) {
			return true;
		} else {
			return false;
		}
	}

}




/*
 生产
 *初始化全局缓存 初始化   初始化此书initialize  the global cache of navigator
 *
 *  初始化
 */

function initCache() {
	cache = window.localStorage
			|| {
				"setItem" : function(key, value) {
					this[key] = value;
				},
				"getItem" : function(key) {
					return this[key];
				},
				"removeItem" : function(key) {
					this[key] = null;
					delete this[key];
				},
				"clear" : function() {
					for ( var key in this) {
						if (key != 'setItem' && key != 'getItem'
								&& key != 'removeItem' && key != 'clear'
								&& key != 'setObjectItem'
								&& key != 'getObjectItem') {
							this[key] = null;
							delete this[key];
						}
					}
				}

			};

}
(initCache());

function jumpToPage(type, preferences, tips) {

	var paramto="key=af170c124230fc5472c3e993e932567922ce8c35&timestamp="+new Date().getTime()+"&plateform_flg=2";
	var localhref="";
	switch (type) {
	case "list":
		localhref = "" + preferences + ".html?term_id=" + tips+"&";
		break;
	case "item":
		localhref= "" + preferences + ".html?";
		break;
	case "article":
		localhref = "" + preferences + ".html?articleid=" + tips+"&";
	default:
		break;
	}

	window.location.href=localhref+paramto;
}



//图片轮播的调用代码
function slider() {
	/*---slide start--*/
	var slider = $('#slider');
	slider.find(".slide-trigger").find("li").eq(0).addClass("cur");
	window.mySwipe = new Swipe(document.getElementById('slider'), {
		speed : 400,
		auto : 3000,
		callback : function(index, elem) {
			slider.find(".slide-trigger").find("li").eq(index).addClass("cur")
					.siblings().removeClass("cur");
		}
	});
	/*---slide end---*/
}


/**
 * Created by admin on 2015/9/9.
 */
/**
 *  使用方法 "aaa??".format("1","2") or aaa??".format("1").format("2");
 * @returns {*}
 */
String.prototype.format = function() {
	if (arguments && arguments.length) {
		var count = 0;
		var str = "";
		for (var index = 0; index < this.length; index++) {
			var code = this.charAt(index);
			switch (code) {
			case '?':
				str = str + arguments[count++];
				break;
			default:
				str = str + code;
				break;
			}
		}
		return str;
	}
	return this;
};

/**
 * append  使用方法 "".append(...).append(...)
 * @returns {string}
 */
String.prototype.append = function() {
	var cur = "" + this;
	if (arguments) {
		for (var index = 0; index < arguments.length; index++) {
			cur = cur + arguments[index];
		}
	}
	return cur;
};
