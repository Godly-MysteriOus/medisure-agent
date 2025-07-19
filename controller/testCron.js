const sharedModel = require('medisure-mongoose-model');
const generalFxn = require('../utils/generalFunction');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const filePathRelativeToRoot = path.relative(projectRoot, __filename);
const logger = require('../utils/Logger/logger')(filePathRelativeToRoot,'TestCron');
let agent1val= false,agent2val = false;
exports.createTestEntry = async()=>{
    if(agent1val){
        logger.debug('createTestEntry Agent is still running the previous job');
        return;
    }
    agent1val = true;
    logger.debug('Inside createTestEntry method !!! '+new Date())
    const time = generalFxn.IndianStandardTime(0).toString().split(' ')[4];
    const date = new Date().toISOString().split('T')[0];
    const entry = await sharedModel.testCronDB.create({message:'Hi',createTime:time,createDate:date});
    agent1val = false;
    logger.debug('create Job Completed');
}
exports.deleteTestEntry = async()=>{
    if(agent2val){
        logger.debug('deleteTestEntry is still running the previous job');
        return;
    }
    agent2val = true;
    logger.debug('Inside deleteTestEntry method !!! '+ new Date())
    const deletedEntry = await sharedModel.testCronDB.deleteMany({message:'Hi'});
    logger.debug("Number of entries deleted : "+deletedEntry.deletedCount);
    agent2val = false;
    logger.debug('delete Job Completed');
}