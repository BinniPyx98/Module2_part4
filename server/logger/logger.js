const opts = {
    logFilePath:'./logger/info.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
};
import  SimpleNodeLogger from 'simple-node-logger'
const logger=SimpleNodeLogger.createSimpleFileLogger('logger/info.log')
//const log = SimpleNodeLogger.createSimpleLogger(opts);

export default logger