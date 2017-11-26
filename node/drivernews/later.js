var later = require('later')
const api = require('./src/api')

later.date.localTime()

var basic = {h: [23], m: [55]}
var composite = [
  basic
]
// var composite = [
//   basic,
//   {h: [12], m: [0]},
//   {h: [18], m: [0]},
//   {h: [7], m: [0]}
// ]
var exception = []

var sched = {
  schedules: composite,
  exceptions: exception
}

// test
//  var   occurrences = later.schedule(sched).next(20);

// for(var i=0;i<20;i++){
//     console.log(occurrences[i]);
// }

// get News
var t = later.setInterval(function () {
  // news
  api.storeNewsToDB()
}, sched)
