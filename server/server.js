import * as swaggerUI from "swagger-ui-express";
import * as path from 'path';
import YAML from 'yamljs';
import fileUpload from 'express-fileupload';
import express from 'express';
import config from 'config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import auth from './routes/auth.js';
import gallery from './routes/gallery.js';
import home from './routes/home.js';
import logger from './logger/logger.js';
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));
app.use(express.json(), (request, response, next) => {
    requestLogging(request);
    if (request.method === 'OPTIONS') {
        let responseWithAHeader = setHeaderForOptions(response);
        responseWithAHeader.end();
    }
    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkToken(request, next, response);
    }
    else {
        next();
    }
});
app.use(fileUpload({}));
app.use("/auth", auth);
app.use("/", home);
app.use("/gallery", gallery);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static('src/gallery/img'));
function setHeaderForOptions(response) {
    response.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET");
    response.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization");
    response.setHeader("Access-Control-Max-Age", "86400");
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200);
    return response;
}
function checkToken(request, next, response) {
    if (request.headers.authorization === 'token') {
        next();
    }
    else {
        logger.info('Not authorization');
        response.send('Not authorization');
    }
}
function requestLogging(request) {
    logger.info('Method-' + JSON.stringify(request.method) + ' ' +
        'Url-' + JSON.stringify(request.url) + ' ' +
        'Body-' + JSON.stringify(request.body) + ' ' +
        'Headers-' + JSON.stringify(request.headers));
}
/*
********************** Start server ***********************
 */
export default app;
//# sourceMappingURL=server.js.map