/**
 * Created by 16050837 on 2017/3/28.
 */
let logs=(desc,w)=>{
    var flag=1; //输出日志
    if(w){
        flag=false;
        console.log("当前输出单位:",desc);
    }
    if(flag==true){
        console.log("当前输出单位:",desc);
    }
}

//设置cookie
export const addCookie=(name,value,time=1)=>{
    var Days=1; //默认一天
    if(/.s|S$/.test(time)){
        logs('秒');
        time=parseFloat(time);
        Days=time*1000; //秒
    }else if(/.m|M$/.test(time)){
        logs('分');
        time=parseFloat(time);
        Days=time*60*1000; //分
    }else if(/.h|H$/.test(time)){
        logs('时');
        time=parseFloat(time);
        Days=time*60*60*1000; //时
    }else if(/.d|D$/.test(time)){
        logs('天');
        time=parseFloat(time);
        Days=time*24*60*60*1000; //天
    }else{
        Days=Days*24*60*60*1000; //默认
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//获取cookie
export const getCookie=(name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


//删除cookie
export const delCookie=(name)=>{
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}