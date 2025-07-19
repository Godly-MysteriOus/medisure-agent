const express = require('express');
const app = express();
const DBConnection = require('./utils/DB_Conn/connection');
const uiRequest = require('./controller/UIRequest');
const jobNameSchedule = require('./utils/cronConfig/agentScheduleMap');
app.use(express.json());

app.post('/test-create-result',uiRequest.testAPICall);
setImmediate(async()=>{
    console.log('Inside setImmediate method !!!');  
    jobNameSchedule.getCronSchedule();
})

// setInterval(async()=>{
//     console.log('Inside setInterval method !!!'+new Date().toISOString());
//     jobNameSchedule.getCronSchedule();
// },5*60*1000);

DBConnection.connect(app,process.env.PORT||2200);