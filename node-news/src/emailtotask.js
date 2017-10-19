var fs = require('fs')
var config = require('../config/default.js')
var db = require('../lib/sql.js')

var emailService = function () {

}
var dateFormat = function (date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, // 月份 
    'd+': date.getDate(), // 日 
    'h+': date.getHours(), // 小时 
    'm+': date.getMinutes(), // 分 
    's+': date.getSeconds(), // 秒 
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度 
    'S': date.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

var sinceTime = 'Oct 12, 2017'

emailService.checkTime = function () {

  fs.readFile('temp.txt', 'utf-8', function (err, data) {
    if (err) {
      sinceTime = dateFormat(new Date(), 'yyyy-MM-dd')
      fs.writeFile('temp.txt', sinceTime, function (err) {
        if (err) throw err
        console.log('获取邮件开始时间' + sinceTime)
      })
    } else {
      sinceTime = data
      console.log('获取邮件开始时间' + sinceTime)
    }
  })
}

var saveToDb = function (tasks) {
  tasks.forEach((task) => {
    db.insertData(task.title, task.content)
      .then(res => {
        var re = JSON.parse(JSON.stringify(res))
        if (re.affectedRows > 0) {
          console.log('success: ' + task.title + ' is inserted.')
        }
      }).catch(() => {
        console.log('error: ' + task.title + ' is not inserted.')
      })
    console.log('邮件导入数据库完成.')
  })
}

emailService.updateRecode = function () {
  fs.writeFile('temp.txt', dateFormat(new Date(), 'yyyy-MM-dd'), function (err) {
    if (err) throw err
    console.log('邮件记录已经更新.')
  })
}
module.exports = emailService
