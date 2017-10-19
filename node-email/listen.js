const  MailListener = require("mail-listener2");
const config = require('./config/default.js')
const db = require('./lib/sql.js')
const cheerio = require('cheerio')
var cateMap = {

}
var mailListener = new MailListener({
  username: config.email.USER,
  password: config.email.PASSWORD,
  host: config.email.HOST,
  port: config.email.PORT, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});

mailListener.start(); // start listening

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function(){
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});

mailListener.on("error", function(err){
  console.log(err);
});

mailListener.on("mail", function(mail, seqno, attributes){
  // do something with mail object including attachments
  console.log("emailParsed", mail);
var titlecate =  mail.subject.replace('任务速配—', '').replace('转发：', '').replace('Fw:', '');
let cate = titlecate.indexOf('@') >0 ? titlecate.split('@')[0]:'综合开发'
var title = titlecate.indexOf('@') >0 ?titlecate.split('@')[1]:titlecate
let content ='没有详情'
if(mail.from[0].address =='i@lirawx.cn'){
  let $ = cheerio.load(mail.html);
// console.log($('div[style="line-height:25px;"]').text());
content= $('div[style="line-height:25px;"]').text().replace('\n尊敬的xueying13，','');

}else {
  content = JSON.stringify(mail.html)
}

console.log(content)
var cateId = 0
if (cate == '' || cate == null) {
    cateId = 170
} else {
    db.getCate(cate)
        .then(res => {
            res = JSON.parse(JSON.stringify(res))
            console.log(res)
            if (res[0].id!=='undefined'&&res[0].id > 0) {
                db.insertData(title, content,res[0].id)
                    .then(res => {
                        var re = JSON.parse(JSON.stringify(res));
                        if (re.affectedRows > 0) {
                            console.log('success: ' + title + ' is inserted.')
                        }
                    }).catch(() => {
                        console.log('error: ' + title + ' is not inserted.')
                    })

            }
        }).catch(() => {
                        console.log('error:  cate' + cate + ' is not exist.')
    })
}
  // mail processing code goes here
});

mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
// mailListener.imap.move(:msguids, :mailboxes, function(){})
