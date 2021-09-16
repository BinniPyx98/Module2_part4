// const opts = {
//     logFilePath: './logger/info.log',
//     timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
// };
import SimpleNodeLogger from 'simple-node-logger'

let logger = SimpleNodeLogger.createRollingFileLogger({
    logDirectory: './logger',
    dateFormat: 'DD.MM.YYYY',
    fileNamePattern: 'info_<DATE>.log',
})
//const log = SimpleNodeLogger.createSimpleLogger(opts);
let now = new Date()


// setInterval(() => {
//     let y = now.getFullYear()
//     let m = now.getMonth()
//     let d = now.getDate()
//
//     logger = SimpleNodeLogger.createSimpleFileLogger(`logger/info${y}`+`_`+`${m}`+`_`+`${d}`+`.log`);
// }, 2000);

export default logger