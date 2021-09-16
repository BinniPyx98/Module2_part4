import {Response, Request, NextFunction} from "express";

import * as swaggerUI from "swagger-ui-express";
import * as path from 'path';
import YAML from 'yamljs';

import  fileUpload from 'express-fileupload';
import express from 'express';
import config from 'config';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import auth from './routes/auth.js' ;
import  gallery from './routes/gallery.js';
import home from './routes/home.js';
import logger from './logger/logger.js';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));

app.use(express.json(), (request: Request, response: Response, next: NextFunction) => {
    requestLogging(request);

    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkToken(request, next, response);
    } else {
        next();
    }
});
app.use(fileUpload({}));

app.use("/auth", auth);
app.use("/", home);
app.use("/gallery", gallery);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static( 'src/gallery/img'));

function checkToken(request: Request, next: NextFunction, response: Response): void {
    if (request.headers.authorization === 'token') {
        next();
    } else {
        logger.info('Not authorization');
        response.send('Not authorization');
    }
}


function requestLogging(request: Request): void {
    logger.info('Method-' + JSON.stringify(request.method) + ' ' +
        'Url-' + JSON.stringify(request.url) + ' ' +
        'Body-' + JSON.stringify(request.body) + ' ' +
        'Headers-' + JSON.stringify(request.headers));
}


/*
********************** Start server ***********************
 */

export default app