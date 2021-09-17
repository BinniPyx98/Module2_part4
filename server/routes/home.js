import config from 'config';
import logger from '../src/logger/logger.js';
import express from 'express';
const router = express.Router();
router.get('/', (request, response) => {
    logger.info(JSON.stringify(request.headers));
    response.sendFile(config.get('ClientPath'));
});
export default router;
//# sourceMappingURL=home.js.map