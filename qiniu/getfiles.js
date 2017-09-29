var qiniu = require('qiniu');
var express=require('express');
var app=express();
var accessKey='RCjTzcYXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

var secretKey='cy41nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
//config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

var bucket = "XXXXX";

//时间的转换
var format=function(timestamp) {
		var time = new Date(timestamp);
		var year = time.getFullYear();
		var month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
		var date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
		var hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
		var minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
		var second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
		var YmdHis = year + '-' + month + '-' + date
			+ ' ' + hour + ':' + minute + ':' + second;
		return YmdHis;
	}
var formateTime =function (timestamp) {
		timestamp = timestamp.toString().slice(0,10);
		timestamp = timestamp.replace(/^\s+|\s+$/, '');
		if (/^\d{10}$/.test(timestamp)) {
			timestamp *= 1000;
		} else if (/^\d{13}$/.test(timestamp)) {
			timestamp = parseInt(timestamp);
		} else {
			// alert('时间戳格式不正确！');
			return;
		}
		var YmdHis = format(timestamp);
		return YmdHis;
}

//文件大小的转换
var bytesToSize=function(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
app.get('/book/:pre',function(req,res){

// var key = "bg03.jpg";
// @param options 列举操作的可选参数
//                prefix    列举的文件前缀
//                marker    上一次列举返回的位置标记，作为本次列举的起点信息
//                limit     每次返回的最大列举文件数量
//                delimiter 指定目录分隔符

var options = {
  // limit: 10,
  // prefix:'pdf'
  // prefix: req.param('pre')
  prefix: req.params.pre
};

var booklist=[];

	bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
  if (err) {
    console.log(err);
    throw err;
  }

  if (respInfo.statusCode == 200) {
    //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
    //指定options里面的marker为这个值
    var nextMarker = respBody.marker;
    var commonPrefixes = respBody.commonPrefixes;
    // console.log(nextMarker);
    // console.log(commonPrefixes);
    var items = respBody.items;
    items.forEach(function(item) {
    	var book ={};
    	book['title']=item.key;
    	book['url']='http://cdn.lirawx.cn/'+item.key;
    	book['fsize']=bytesToSize(item.fsize);
    	book['putTime']=formateTime(item.putTime);
    	book['mimeType']=item.mimeType;
    	book['endUser']=item.endUser;
    	// book['type']=item.type;
    	booklist.push(book);
    	// console.log(book);
      // console.log(item.key+'\n'+item.hash);
      // console.log('http://cdn.lirawx.cn/'+item.key);
      // console.log(item.putTime);
      // console.log(item.hash);
      // console.log(item.fsize);
      // console.log(item.mimeType);
      // console.log(item.endUser);
      // console.log(item.type);
    });
    res.send(booklist);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});


});


app.listen(3003,function (req,res) {
	console.log('app is listening at port 3000 !');
});
