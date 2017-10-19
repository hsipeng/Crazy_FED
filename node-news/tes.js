var Feed = require('rss-to-json')
var newsList = []
Feed.load('http://www.xinhuanet.com/politics/news_politics.xml', function (err, rss) {
  if (err) {
    console.log('err:' + err)
  }
  // console.log(rss)
  newsList = rss.items
  console.log(newsList)
})
