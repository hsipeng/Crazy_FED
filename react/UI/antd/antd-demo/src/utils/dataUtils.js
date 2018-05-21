import React from 'react'
import moment from 'moment'

export const isYYSFM =(s)=>{
    return moment(s).format("YYYY年MM月DD日 hh:mm:ss")
}

export const isYYS =(s)=>{
    return moment(s).format("YYYY年MM月DD日")
}
export const isDateForm =(s)=>{
    return moment(s).format("YYYY-MM-DD")
}
//将对象转换为查询字符串
export function obj2SearchStr(obj){
    var str=""
    if(obj){
        for(var i in obj){
            str+="&"+i+"="+obj[i]
        }
    }
    str=str.replace(/^&/,"?")
    return str
}

//百分比转化
export const toPercent=(n)=>{
    return (Math.round(n * 10000)/100).toFixed(2) + '%'
}


//科学计算发
export const formatCurrencyData=(num)=> {
    if(null==num||typeof(num) == "undefined"){
        return "0"
    }
    
    num = num.toString().replace(/\$|\,/g,'')
    var isFloat=num.indexOf(".")>-1 ? true:false
    if(isNaN(num))
        num = "0"
    let sign = (num == (num = Math.abs(num)))
    num = Math.floor(num*100+0.50000000001)
    let cents = num%100
    num = Math.floor(num/100).toString()
    if(cents<10)
        cents = "0" + cents
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3))
    if(!isFloat){
        return (((sign)?'':'-') +(num))    
    }
    if(isFloat){
        return (((sign)?'':'-') + num +'.'+cents)
    }
    
}
//去除前面符号
export const clqz = (str) => {
    return (str!= undefined)?String(str).replace(/-/, ""):''
}

//字符串截取
export const handString=(str,len)=>{
    len=len?len:20; //初始化长度
    if(str && str.length>len){
        str=str.substring(0,len)+'...'
    }
    return str
}
