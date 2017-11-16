var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent) // install charset
var db = require('./lib/sql.js')

let getHTML = function (url,CALLBACK){
  superagent.get(url)
  .charset('gbk')
  .set('Content-Type', 'text/html; charset=GBK')
  .set('cookie','UM_distinctid=15fbdad4376118-0b1d4e2df1a44b-6313117c-15f900-15fbdad437714e; cna=d5+SEvn+aXgCATrWOw99xPiW; JSESSIONID=8L78Q8xZ1-WSiYgdrS9xZdvhQQl6-Z3Pr0bQ-4nJ; alicnweb=touch_tb_at%3D1510715774110; h_keys="%u4f60%u597d"; sec=5a0bb200da6f33cefc55a3876b48543887af4bd4; __cn_logon__=false; _tmp_ck_0="IlQ2M6x9F5xTkEpGRay66ORc1Nb1GQhlZzB4Fk1q2xsQriDphaQMRg0iR5fQ2ERr9orq8V0SRJ5HRHyRypbua8fWqk05%2BwjzX9xTj9pi706%2BTA9kL%2FBiYhTjEGZaEV1tiIHyfprlLR6FEnhLzResHr1YesabG5sRb7SjqHz03WEUY5iANUcTf%2FEhkooCsPAWrDehjezyZX4ZR0Y%2FdWc6anyVvTyE6l%2BBFgJU3l%2F%2BFFo%2BiblihSPqwFWcuLJ6n%2BsyEZS8bSRWdmiQ0tomrp9MTxC9tSibb6Bnrs51RAdwI3NlIhAwRyxlR4Q%2FgKnFSz6daYaiRBsPUDIG3dV2Vyt8YKS3EbVjgaKISZcGVfl5fo3XC6EDHUq0gYHM8X5VsjtfgkgrMujHtx4%3D"; ad_prefer="2017/11/15 11:44:20"; alisw=swIs1200%3D1%7C; ali_ab=58.214.59.15.1510715767974.7; isg=ApeXujlAgeWNwgVpaIj-KzspJgshdGpb6V9TKenEuWbNGLda8az7jlU6DI79')
  .set('refer','https://s.1688.com/company/company_search.htm?keywords=%BE%AB%C3%DC%BB%FA%D0%B5&sortType=manufacture&province=%BD%AD%CB%D5&biztype=1&n=y&filt=y')
  .set('user-agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36')
  .set('accept-language','zh-CN,zh;q=0.8')
  .end(function (err,sres){
      if(err){
          // console.log(err) ;
          
      }
      // console.log(sres)
      if(sres.statusCode ===200){
        CALLBACK(sres.text)

      }
      CALLBACK(null)
    })
}

let getComs = function(page){
  let pageUrl = 'https://s.1688.com/company/company_search.htm?keywords=%BE%AB%C3%DC%BB%FA%D0%B5&province=%BD%AD%CB%D5&biztype=0&n=y&filt=y&pageSize=30&offset=3&beginPage='+page
  getHTML(pageUrl,function(html){
    if(html != null){
      var $ = cheerio.load(html,{decodeEntities:false});
      let nextpage = Number($('.page-next').attr('beginpage'));
      console.log(nextpage)
      let totalpage = Number($('.total-page').text().match(/\d*/g)[1]);
      console.log(totalpage)
      $('.company-list-item').each(function(idx,ele){
        let  $item= $(ele).find('.list-item-title-text')
        let url = $item.attr('href')
        let title = $item.text();
        console.log(title)
        console.log(url)
        getComContact(url,function(info){
          console.log(info)
          console.log('#############################################')
        })
        // console.log('#############################################')
      })
      if(nextpage <=totalpage){
        getComs(nextpage)
      }
    }
  })
}