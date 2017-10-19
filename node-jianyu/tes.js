var request = require('request')
const cheerio = require('cheerio')

var publishTime = '1508256000_1508342400'
var baseContentUrl = 'https://www.jianyu360.com/article/content/'




var  getTask = function (saveTasks) {
    var options = {
    url: 'https://www.jianyu360.com/jylab/supsearch/getNewBids?pageNumber=1&reqType=lastNews&searchvalue=&area=&subtype=%E6%8B%9B%E6%A0%87%2C%E9%82%80%E6%A0%87%2C%E8%AF%A2%E4%BB%B7%2C%E7%AB%9E%E8%B0%88%2C%E5%8D%95%E4%B8%80%2C%E7%AB%9E%E4%BB%B7%2C%E5%8F%98%E6%9B%B4%2C%E5%85%B6%E4%BB%96&publishtime=' + publishTime + '&selectType=title&minprice=&maxprice=&industry=%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF_%E7%B3%BB%E7%BB%9F%E9%9B%86%E6%88%90%E5%8F%8A%E5%AE%89%E5%85%A8%2C%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF_%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91%2C%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF_%E8%BF%90%E7%BB%B4%E6%9C%8D%E5%8A%A1%2C%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF_%E5%85%B6%E4%BB%96',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
        'Referer': 'https://www.jianyu360.com/jylab/supsearch/index.html',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'UM_distinctid=15f27f83d9934c-0acea14aacbc0a-6313117c-15f900-15f27f83d9a36a; CNZZDATA1261815924=768482664-1508198641-%7C1508300679; Hm_lvt_72331746d85dcac3dac65202d103e5d9=1508204102,1508304711; Hm_lpvt_72331746d85dcac3dac65202d103e5d9=1508305086; userid_secure=GycHKzoDd2deRjs6KAorJkgdQmIzWkksEBMKfQ==; SESSIONID=4558c237c8c33dea52ce51733ff952a7c18c3848'
    }
}



request(options, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        tasklist = JSON.parse(body).list
        tasklist.forEach( (task, index)  => {

            getContent(task._id,function(data) {
                console.log(data)
                var t = {}
                t['content'] =  data
                t['index'] = index
                t['title'] = task.title
                t['publishtime'] = task.publishtime
                t['area'] = task.area
                t['industry'] = task.industry
                saveTasks(t)

        })

        });

    }
})
}

var getContent = function (_id, callback) {
    console.log(_id)
    var urlOptions = {
        url: baseContentUrl + _id + '.html',
        gzip:true,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36',
            'Referer': 'https://www.jianyu360.com/jylab/supsearch/index.html',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cookie': 'UM_distinctid=15f27f83d9934c-0acea14aacbc0a-6313117c-15f900-15f27f83d9a36a; CNZZDATA1261815924=768482664-1508198641-%7C1508300679; Hm_lvt_72331746d85dcac3dac65202d103e5d9=1508204102,1508304711; Hm_lpvt_72331746d85dcac3dac65202d103e5d9=1508305086; userid_secure=GycHKzoDd2deRjs6KAorJkgdQmIzWkksEBMKfQ==; SESSIONID=4558c237c8c33dea52ce51733ff952a7c18c3848'
        }
    }



    request(urlOptions,function (error, response ,body) {
        if (!error && response.statusCode == 200) {
            // var buf =  iconv.decode(body, 'gb2312');  // 获取内容进行转码
           var  $ = cheerio.load(body,{decodeEntities: false})
           let con = $('.com-detail').html()
           console.log(con)
           callback(con)
        }
    })

}

var tasklist = []
getTask( (task) => {
    console.log(task)
    // tasklist.push(task)
})

console.log(tasklist[0])
