const scheduledAgent = require('../../models/scheduler');
const agentScheduleRoute = require('../../route');
exports.getCronSchedule = async()=>{
    const cronJobs = await scheduledAgent.find().select('-_id');
    const cronJobNames = cronJobs.map(item=>item.agent_name);
    const jobNameScheduleMap = new Map();

    cronJobNames.forEach(item => {
        const cronObj = cronJobs.filter(obj=>obj.agent_name == item);
        jobNameScheduleMap.set(item,cronObj[0].cron_schedule);
    });
    agentScheduleRoute.cronScheduleControllerMap(cronJobNames,jobNameScheduleMap);
}