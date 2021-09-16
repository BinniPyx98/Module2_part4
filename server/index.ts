const app=require("./server.js")
const logger = require('./logger/logger');

app.listen(5400, () => {
    logger.info('Server running');

})