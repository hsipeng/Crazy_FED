var later = require('later');
var email = require('./src/emailtotask.js')
var news = require('./src/newstoarticle.js')

later.date.localTime();

var basic = {h: [23], m: [00]};
var composite = [
    basic,
    {h: [12], m: [00]},
    {h: [18], m: [00]},
    {h: [07], m: [00]}
];

var composite2 = [
    basic
];

var exception = [];

var sched = {
    schedules:composite,
    exceptions:exception
};

var sched2 = {
    schedules:composite2,
    exceptions:exception
};
//test
//  var   occurrences = later.schedule(sched).next(20);

// for(var i=0;i<20;i++){
//     console.log(occurrences[i]);
// }

//get News
var t=later.setInterval(function(){
     //news
        news.getNews();
},sched);


var t2=later.setInterval(function(){
     //email
        email.getEmail();
},sched2);
