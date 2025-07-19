const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const filePathRelativeToRoot = path.relative(projectRoot, __filename);
const logger = require('../utils/Logger/logger')(filePathRelativeToRoot,'Excess-log');

exports.testAPICall = (req,res,next)=>{
    logger.info('Inside testAPICall method !!!');
    const {success,message} = req.body;
    console.log(success,message);
}