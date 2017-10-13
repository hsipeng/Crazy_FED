var Imap = require('imap')
var MailParser = require("mailparser").MailParser
var fs = require("fs")
var cheerio = require('cheerio')
var config = require('./config/default.js')
var db = require('./lib/sql.js')

var imap = new Imap({
  user: config.email.USER, //你的邮箱账号
  password: config.email.PASSWORD, //你的邮箱密码
  host: config.email.HOST, //邮箱服务器的主机地址
  port: config.email.PORT, //邮箱服务器的端口地址
  tls: config.email.TLS, //使用安全传输协议
  tlsOptions: config.email.TLSOPTIONS //禁用对证书有效性的检查
});





Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var taskList = [];
var sinceTime = 'Oct 12, 2017';

fs.readFile('temp.txt', 'utf-8', function(err, data) {
  if(err) {
    sinceTime = new Date().Format("yyyy-MM-dd");
    fs.writeFile('temp.txt', sinceTime, function (err) {
      if (err) throw err;
      console.log('获取邮件开始时间'+sinceTime);
    })
    
  } else {
    sinceTime = data;
    console.log('获取邮件开始时间'+sinceTime);
  }
});


function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
 
  openInbox(function(err, box) {
 
    console.log("打开邮箱")
 
    if (err) throw err;
 
    imap.search(['UNSEEN', ['SINCE', sinceTime]], function(err, results) {//搜寻2017-05-20以后未读的邮件
 
      if (err) throw err;
 
      var f = imap.fetch(results, { bodies: '' , markSeen: true});//抓取邮件（默认情况下邮件服务器的邮件是未读状态）
 
      f.on('message', function(msg, seqno) {
 
        var mailparser = new MailParser();
        var task = {};
        msg.on('body', function(stream, info) {
 
          stream.pipe(mailparser);//将为解析的数据流pipe到mailparser
          //邮件头内容
          
          mailparser.on("headers", function(headers) {
            // console.log(headers);
            // console.log("邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            // console.log("邮件主题: " + headers.get('subject'));
            // console.log("发件人: " + headers.get('from').text);
            // console.log("收件人: " + headers.get('to').text);
            task['date'] = headers.get('date');
            task['title'] = headers.get('subject').replace('任务速配—','').replace('转发：','');
            task['from'] = headers.get('from').text;
            task['to'] = headers.get('to').text;
            // console.log(headers.get('subject'))
          });
 
          //邮件内容
 
          mailparser.on("data", function(data) {
            if (data.type === 'text') {//邮件正文
              // console.log("邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
              // console.log("邮件内容: " + data.html);
              $ = cheerio.load(data.html);
              // console.log($('div[style="line-height:25px;"]').text());
              let body= $('div[style="line-height:25px;"]').text().replace('\n尊敬的xueying13，','');
               task['content'] = '<p>'+body+'</p>'
              taskList.push(task);
            }
            // if (data.type === 'attachment') {//附件
            //   console.log("邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            //   console.log("附件名称:"+data.filename);//打印附件的名称
            //   data.content.pipe(fs.createWriteStream(data.filename));//保存附件到当前目录下
            //   data.release();
            // }
          });
 
        });
        msg.once('end', function() {
          console.log(seqno + '完成');
        });
      });
      f.once('error', function(err) {
        console.log('抓取出现错误: ' + err);
      });
      f.once('end', function() {
        console.log('所有邮件抓取完成!');
        
        imap.end();
      });
    });
  });
});
 
imap.once('error', function(err) {
  console.log(err);
});
 
imap.once('end', function() {
  // console.log(taskList);
  console.log('邮件解析完成.')
  taskList.forEach((task)=>{
     db.insertData(task.title,task.content)
    .then( res => {
      var re = JSON.parse(JSON.stringify(res));
      if(re.affectedRows > 0){
        console.log('success: '+task.title+' is inserted.')
      }
    }).catch(()=>{
      console.log('error: '+task.title+' is not inserted.')
    })
  });
  
  console.log('邮件导入数据库完成.')

  var lasTadk = taskList.pop();
  fs.writeFile('temp.txt', lasTadk.date.Format("yyyy-MM-dd"), function (err) {
    if (err) throw err;
    console.log('邮件记录已经更新.')
  })
  
  console.log('关闭邮箱');
});
 
imap.connect();