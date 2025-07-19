const mongoose = require('mongoose');
const config = require('../../config');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const filePathRelativeToRoot = path.relative(projectRoot, __filename);
const logger = require('../../utils/Logger/logger')(filePathRelativeToRoot);

exports.dbURI = {
    localURI : config.localEnvDBConnection,
    devURI : config.devEnvDBConnection,
    prodURI : config.prodEnvDBConnection
}
exports.connect = (app,PORT)=>{
    mongoose.connect(exports.dbURI.devURI)
    .then(()=>app.listen(PORT))
    .then(()=>logger.debug('Connection Successful'))
    .catch(err=>{
        logger.error('Error connecting to database');
        logger.error(err.stack);
    });
}