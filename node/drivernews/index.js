const express = require('express')
const app = express()
const config = require('./config/default')
const api = require('./src/api')
app.get('/news/latest', function (req, res, next) {
  api.getLatest(function (news) {
    if (news !== null) {
      res.send(news)
    } else {
      res.send('no news.')
    }
  })
})

app.get('/news/:year/:month/:day', function (req, res, next) {
  let year = req.params.year === null || req.params.year === undefined ? '2017' : req.params.year
  let month = req.params.month === null || req.params.month === undefined ? '11' : req.params.month
  let day = req.params.day === null || req.params.day === undefined ? '26' : req.params.day
  let t = year + '-' + month + '-' + day
  api.selectNewsByDate(t, function (news) {
    if (news !== null) {
      res.send(news)
    } else {
      res.send('no news.')
    }
  })
})

app.listen(config.port, function () {
  console.log('app is listening at port 3000')
})
