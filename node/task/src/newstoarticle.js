var Feed = require('rss-to-json')
const cheerio = require('cheerio')
const request = require('request')
const db = require('../lib/sql.js')


var newsService = function () {

}


newsService.getNews = function () {
    var newsList = []

var getContent = function (link, callback) {
    var urlOptions = {
        url: link,
        gzip:true,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
            'Content-Type': 'text/html; charset=UTF-8',
    }
}


    request(urlOptions,function (error, response ,body) {
        if (!error && response.statusCode == 200) {
           callback(body)
        }
    })

}

var getDetail = function (news,cbDetail) {
    var content ='无'
   getContent(news.link,function ( html) {
     let $ = cheerio.load(html,{decodeEntities: false})
     $('.video-frame').remove()
      $('.lb').remove()
      $('.zan-wap').remove()
      $('.p-tags').remove()
    if ($('#p-detail')!='undefined' && $('#p-detail')!='') {
     content = $('#p-detail').html()
    }
    if ($('#content')!='undefined' && $('#content')!='') {
      content =  $('#content').html()
    }
    cbDetail(content)
   })
}


Feed.load('http://www.xinhuanet.com/politics/news_politics.xml', function (err, rss) {
  if (err) {
    console.log('err:' + err)
  }
  // console.log(rss)
  newsList = rss.items
  // console.log(newsList)
  for (let news of newsList) {

    getDetail(news,function (detail) {
      news['content'] = detail
      // console.log(news)
      db.getNews(news['title'])
        .then(res => {
            res = JSON.parse(JSON.stringify(res))
            if (res.length == 0) {
               db.insertArticle(news['title'], news['content'])
                    .then(res => {
                        var re = JSON.parse(JSON.stringify(res));
                        if (re.affectedRows > 0) {
                            console.log(new Date() +'success: ' +news['title'] + ' is inserted.')
                        }
                    }).catch(() => {
                        console.log(new Date() + 'error: ' + news['title'] + ' is not inserted.')
                    })
            }else  {
              console.log(new Date() + 'info: ' + news['title'] + ' is existed.')
            }

          }).catch(() => {
                        console.log(new Date() + 'info: ' + news['title'] + ' is existed.')
                    })

    })

  }
})

}


module.exports=newsService;


