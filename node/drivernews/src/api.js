var cheerio = require('cheerio')
var superagent = require('superagent')
require('superagent-charset')(superagent) // install charset
const db = require('../lib/sql')
const moment = require('moment')

let getLatest = function (CALLBACK) {
  superagent.get('http://news.mydrivers.com/blog/')
    .set('Content-Type', 'text/html charset=gbk')
    .charset('gb2312')
    .end(function (err, sres) {
      if (err) {
        CALLBACK(null)
      }
      // console.log(sres)
      var $ = cheerio.load(sres.text, {decodeEntities: false})
      var items = []

      $('table#AutoNumber3 table table:not(:last-child)').each(function (idx, ele) {
        var $ele = $(ele).find('tr:nth-child(1) td:nth-child(1) a')
        var $auther = $(ele).find('span').eq(1)
        var $publishtime = $(ele).find('span').eq(2)
        var $content = $(ele).find('tr:nth-child(2) td:nth-child(1)')
        var $img = $(ele).find('p img')
        var $alinks = $(ele).find('a')
        var imgs = []
        var contentHtml = $content.html()
        $alinks.each(function (i, e) {
          if ($(e).attr('href').indexOf('http') < 0) {
            contentHtml = contentHtml.replace($(e).attr('href') + '', 'http://news.mydrivers.com' + $(e).attr('href'))
          }
        })
        $img.each(function (i, e) {
          contentHtml = contentHtml.replace($(e).attr('src') + '', 'http://news.mydrivers.com' + $(e).attr('src'))
          imgs.push('http://news.mydrivers.com' + $(e).attr('src'))
        })

        items.push({
          title: $ele.attr('title'),
          auther: $auther.text(),
          publishtime: $publishtime.text(),
          href: 'http://news.mydrivers.com' + $ele.attr('href'),
          imgsUrl: imgs,
          content: contentHtml
        })
      })
      CALLBACK(items)
    })
}
let storeNewsToDB = function () {
  getLatest(function (news) {
    if (news !== null) {
      for (let n of news) {
        db.insertData(n)
          .then(res => {
            var re = JSON.parse(JSON.stringify(res))
            if (re.affectedRows > 0) {
              console.log('success: ' + n.title + ' is inserted.')
            }
          }).catch(() => {
            console.log('error: ' + n.title + ' is not inserted.')
          })
      }
    }
  })
}

let selectNewsByDate = function (t, CALLBACK) {
  t = t === undefined || t === null ? moment(new Date()).format('Y-M-D') : moment(t).format('Y-M-D')
  db.selectData(t)
    .then(res => {
      var re = JSON.parse(JSON.stringify(res))
      CALLBACK(re)
    }).catch(() => {
      console.log('error,no data.')
      CALLBACK(null)
    })
}
module.exports = {
  getLatest,
  storeNewsToDB,
  selectNewsByDate
}
