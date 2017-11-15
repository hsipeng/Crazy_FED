var cheerio = require('cheerio');
const url = require('url');
var superagent = require('superagent')
require('superagent-charset')(superagent) // install charset
var db = require('./lib/sql.js')
const cityconfig = require('./config/city')
const typeconfig = require('./config/type')
var page = 1
const city ='wuxi'
const type = 'it'


let getHTML = function (url,CALLBACK){
  superagent.get(url)
  .charset('utf-8')
  .set('Content-Type', 'text/html; charset=GBK')
  .set('cookie','PHPSESSID=563469e155144674bddcf2ef72471c3c5a0bcae2e04890.25347923; _gat=1; _ga=GA1.2.825083306.1510722279; _gid=GA1.2.210050719.1510722279; Hm_lvt_c8184fd80a083199b0e82cc431ab6740=1510722281; Hm_lpvt_c8184fd80a083199b0e82cc431ab6740=1510722758')
  .set('refer','http://b2b.huangye88.com/qiye2319468/')
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

let getComs = function(url){
  getHTML(url,function(html){
    if(html != null){
      let nextpageC = 11
      if(page > 1){
        nextpageC = 12
      }
      if(page>=5){
        nextpageC = 13
      }
      var $ = cheerio.load(html,{decodeEntities:false})

      let companyList = []
      $('.mach_list2 dl').each(function(idx,ele){
          let title = $(ele).find('h4 a').attr('title')
          if(title != undefined){
            let detailUrl = $(ele).find('h4 a').attr('href')+'company_contact.html'
            let comtel = $(ele).find('dt span a').text()
            getContactByUrl(detailUrl,function(info){
              info['comtel'] = comtel
              info['city'] = cityconfig[city]
              info['type'] = typeconfig[type]
              console.log(info)
              console.log('start saving to Db ...')
              saveToDb(info)
              console.log(' saved to Db ...')              
              console.log('#################################')
              
            })
          }
         
      })

      //递归下一页
      if($('.page_tag a:nth-child(11)') != undefined&& $('.page_tag a:nth-child(11)') !=='undefined'){
        let nextPageUrl = $('.page_tag a:nth-child('+nextpageC+')').attr('href')
        if(nextPageUrl != undefined){
          page += 1
          console.log('Current Page:'+page)
          console.log(nextPageUrl)
          getComs(nextPageUrl)    
        }
            
      }
    }
  })
}


let getContactByUrl = function(url,CALLBACK){
  getHTML(url,function(html){
    if(html !=null){
      var $ = cheerio.load(html,{decodeEntities:false})
      let info ={}
      $('.con-txt li').each(function(idx,ele){
        // console.log($(ele).find('label').text())
        
        switch($(ele).find('label').text()){
          case '联系人：':
            info['contact'] =$(ele).text().replace('联系人：','')
            break
          case '公司名称：':
          info['comName'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')   
            break
          case '电话：':
          info['tel'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')
            break
          case '手机：':
            info['mobile'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')
              break
          case '传真：':
          info['fax'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')
            break
          case '地址：':
          info['addr'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')
            break
          case '邮编：':
          info['postCode'] =$(ele).html().replace(/<label>(.*)?<\/label>(.*)?/,'$2')
            break
          case '公司主页：':
          info['homePage'] =$(ele).find('a').html()
          break
        }
        
      })

      CALLBACK(info)
    }
  })
}



let calComType = function(CALLBACK){
  getHTML('http://b2b.huangye88.com/',function(html){
    if(html !=null){
      var $ = cheerio.load(html,{decodeEntities:false});
      let typeList = {}
      $('.qiyecont li').each(function(idx,ele){
        let $typeLink = $(ele).find('a')
        let typeName = $typeLink.attr('title').replace('企业名录','')
        let typeUrl = $typeLink.attr('href')
        let myURL = url.parse(typeUrl)
        let type = myURL.pathname.split('\/')[2]
        typeList[type] = typeName
      })
      // CALLBACK(typeList)
      console.log(typeList)
      // for(let key in typeList){
      //   console.log(key +':'+typeList[key])
      // }
    }
  })
}


let calCity = function(CALLBACK){
  getHTML('http://b2b.huangye88.com/region/',function(html){
    if(html !=null){
      var $ = cheerio.load(html,{decodeEntities:false});
      let $root = $('#clist')
      let cityList = {}
      $root.find('a').each(function(idx,ele){
        let cityUrl = $(ele).attr('href')
        let cityName = $(ele).text()
        let cityStr = url.parse(cityUrl).pathname.split('\/')[1]
        cityList[cityStr] = cityName
      })
      CALLBACK(cityList)
      // console.log(cityList)
    }
  })
}


let getStartUrl=  function(city, type){
  return 'http://b2b.huangye88.com/'+city+'/'+type+'/'
}
// getComs('http://b2b.huangye88.com/wuxi/it/pn5/')

// getContactByUrl('http://b2b.huangye88.com/gongsi/3822900/company_contact.html',function(info){
//   console.log(info)
// })

// calComType()

// calCity()


let getHuangye88 = function(){

 
  console.log('#######################################################')
  console.log('start huangye 88 ..')
  console.log('City :'+ cityconfig[city])
  console.log('Type:'+typeconfig[type])
  
  getComs(getStartUrl(city, type))
}



let saveToDb = function (info){
  db.insertData(info)
  .then(res => {
    var re = JSON.parse(JSON.stringify(res));
    if (re.affectedRows > 0) {
        console.log('success: ' + info.contact + ' is inserted.')
    }
}).catch(() => {
    console.log('error: ' + info.contact + ' is not inserted.')
})
}

// saveToDb({ contact: '红场',
// comName: '亲民网',
// homePage: 'http://qinmin123654019.b2b.huangye88.com/',
// comtel: '0510-81189166' })

getHuangye88()