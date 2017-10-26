var cheerio = require('cheerio');
var superagent = require('superagent')
require('superagent-charset')(superagent) // install charset
var db = require('./lib/sql.js')

for(var i=1;i<37 ;i++){
    superagent.get('http://www.ssez.com/news.asp?page='+i+'&None=3&Ntwo=14')
        .set('Content-Type', 'text/html; Charset=utf-8')
        .end(function (err,sres){
            if(err){
                console.log(err) ;
            }
            var $ = cheerio.load(sres.text,{decodeEntities:false});
            // console.log($('body table:nth-child(4) td:nth-child(4) table table  tr td:nth-child(1)').html())
            $('body table:nth-child(4) td:nth-child(4) table table  tr td:nth-child(1)').each(function (idex,ele) {
                var $a = $(ele).find('a')
                var url = 'http://www.ssez.com/news.asp'+$a.attr('href')
                var title = $a.text()

                getContent(url,function (data) {
                    var article = []
                    article['title']=title
                     article['url'] = url
                    article['content'] = data
                    db.insertData(title, data)
                    .then(res => {
                        var re = JSON.parse(JSON.stringify(res));
                        if (re.affectedRows > 0) {
                            console.log('success: ' + title + ' is inserted.')
                        }
                    }).catch(() => {
                        console.log('error: ' + title + ' is not inserted.')
                    })
                    // console.log(article)
                })

            })
        })

var getContent = function (url,callbak) {
    superagent.get(url)
        .set('Content-Type', 'text/html; Charset=utf-8')
        .end(function (err,sres){
            if(err){
                console.log(err)
            }
            var $ = cheerio.load(sres.text,{decodeEntities:false});
            var content = $('body table:nth-child(4) td:nth-child(4) table table tr:nth-child(3)').html()
            callbak(content)
        })
}
}

