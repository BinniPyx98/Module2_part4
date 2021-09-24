
import SimpleNodeLogger from 'simple-node-logger'

 export let logger = SimpleNodeLogger.createRollingFileLogger({
    logDirectory: './src/logger',
    dateFormat: 'DD.MM.YYYY',
    fileNamePattern: 'info_<DATE>.log',
    //RollingInterval.Day
})



//export default logger