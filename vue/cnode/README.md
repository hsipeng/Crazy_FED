---
layout: post
tags: vue vuex vue-router
title: vue vuex vue-router 项目搭建
date: date

---

## 环境
- node v6.11.2
- vue v2.5.2
- vue-router v3.0.1
- vuex v3.0.1
- wepack v3.6.0
...

<!-- more -->
## 项目描述
基于cnode的api 初步搭建vue全家桶的单页应用.

## 项目结构

![](https://ooo.0o0.ooo/2017/11/18/5a1013106434a.png)
## 主要实现
- vue-router的单页导航
```html
主要基于<router-link to=""....> 和$router.push 实现路由的导航
```
- vuex 存储用户登陆信息
```
vuex配合sessionStorage 存储用户信息,方便管理.
```
- ajax请求封装
```
ajax运用 axios promise 封装. 处理错误信息.
```

## 运行截图
![](https://i.loli.net/2017/11/18/5a10141eb5195.png)


## github 地址

[cnode](https://github.com/lirawx/Crazy_FED/tree/master/vue/cnode)
