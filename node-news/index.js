var schedule = require('node-schedule')
var email = require('./src/emailtotask.js')

var rule = new schedule.RecurrenceRule()
// 每天0点更新
rule.hour = 0
rule.minute = 0
rule.second = 0
var job = function scheduleCronstyle () {
  schedule.scheduleJob(rule, function () {
    console.log('scheduleCronstyle:' + new Date())
    email.checkTime()
    email.getEmail()
    email.updateRecode()
  })
}
job()
