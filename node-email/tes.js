var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
// rule.second =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//每天0点更新
rule.hour =0;
rule.minute =0;
rule.second =0;
var job =function scheduleCronstyle(){
    schedule.scheduleJob(rule, function(){
        console.log('scheduleCronstyle:' + new Date());
    }); 
}
job();