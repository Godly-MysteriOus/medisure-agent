const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localDBName = require('../utils/DB_Conn/localDBName');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const audit = require('medisure-mongoose-model');
const scheduled_agent = new Schema({
    seq_id : {
        type: Number,
    },
    agent_name:{
        type:String,
        reqiured:true,
    },
    config:{
        type:String,
    },
    cron_schedule:{
        type:String,
        required:true,
    }
});
scheduled_agent.plugin(AutoIncrement,{inc_field:'seq_id'});
module.exports = mongoose.model(localDBName.scheduler,scheduled_agent,localDBName.scheduler);