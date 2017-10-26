var cheerio = require('cheerio');
var superagent = require('superagent')
require('superagent-charset')(superagent) // install charset



    superagent.get('http://www.ssez.com/news.asp?nlt=1068&none=3&ntwo=14')
        .set('Content-Type', 'text/html; Charset=utf-8')
        .end(function (err,sres){
            if(err){
                return next(err);
            }
            var $ = cheerio.load(sres.text,{decodeEntities:false});
            console.log($('body table:nth-child(4) td:nth-child(4) table table tr:nth-child(3)').html())
            // $('body table:nth-child(4) td:nth-child(4) table table  tr td:nth-child(1)').each(function (idex,ele) {
            //     var $a = $(ele).find('a')
            //     var url = 'http://www.ssez.com/news.asp'+$a.attr('href')
            //     var title = $a.text()
            // })
        })

