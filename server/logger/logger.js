const opts = {
    logFilePath:'./logger/info.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
};
const SimpleNodeLogger = require('simple-node-logger').createSimpleFileLogger('logger/info.log')

//const log = SimpleNodeLogger.createSimpleLogger(opts);

module.exports = SimpleNodeLogger;