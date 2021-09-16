import app from "./server.js"
import logger from './logger/logger.js';

app.listen(5400, () => {
    logger.info('Server running');

})