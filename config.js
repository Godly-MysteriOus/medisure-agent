require('dotenv').config({path:'./credentials.env'});

module.exports = {
    localEnvDBConnection : process.env.localDBConnectionURI,
    devEnvDBConnection : process.env.devDBConnectionURI,
    prodEnvDBConnection : process.env.prodDBConnectionURI
}
