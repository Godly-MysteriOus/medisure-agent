const cron = require('node-cron')
const testCron = require('./controller/testCron');
exports.cronScheduleControllerMap = (jobName,jobScheduleMap)=>{
    console.log(jobName[0],jobScheduleMap.get(jobName[0]));
    cron.schedule(jobScheduleMap.get(jobName[0]),testCron.createTestEntry,{scheduled:true});
    console.log(jobName[1],jobScheduleMap.get(jobName[1]))
    cron.schedule(jobScheduleMap.get(jobName[1]),testCron.deleteTestEntry);
}
