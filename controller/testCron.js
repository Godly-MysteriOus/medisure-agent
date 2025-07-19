const sharedModel = require('medisure-mongoose-model');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const filePathRelativeToRoot = path.relative(projectRoot, __filename);
const logger = require('../utils/Logger/logger')(filePathRelativeToRoot,'TestCron');
const axios = require('axios');
const config = require('../config');
let agent1val= false,agent2val = false;
exports.createTestEntry = async()=>{
    logger.info('Inside createTestEntry method');
    return request = await axios.post(config.medisureUIApplicationURI+'agent/create-test-entry',{},{
        headers:{'Content-Type':'application/json'},
    }).then(result=>logger.debug(result.data.message));
    
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