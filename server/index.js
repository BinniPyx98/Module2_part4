import app from "./server.js";
import logger from './src/logger/logger.js';
app.listen(5400, () => {
    logger.info('Server running');
});
//# sourceMappingURL=index.js.map