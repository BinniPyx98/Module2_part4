import {Response, Request, NextFunction} from "express";

const swaggerUI = require("swagger-ui-express");
const path = require('path');
const YAML = require('yamljs');

let fileUpload = require('express-fileupload');
const express = require('express');
const config = require('config');


const auth = require('./routes/auth');
const gallery = require('./routes/gallery');
const home = require('./routes/home');
const logger = require('./logger/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));


// Логгируем все запросы и проверяем наличие токена в запросах для которых он требуется
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
app.use('/img', express.static(__dirname + '/img'));

function checkToken(request: Request, next: NextFunction, response: Response): void {
    if (request.headers.authorization === 'token') {
        next();
    } else {
        logger.info('Not authorization');
        response.send({errorMessage:'Not authorization'});
    }
}

function requestLogging(request: Request): void {
    logger.info('Method-' + JSON.stringify(request.method) + ' ' +
        'Url-' + JSON.stringify(request.url) + ' ' +
        'Body-' + JSON.stringify(request.body) + ' ' +
        'Headers-' + JSON.stringify(request.headers));
}

/*
********************** Page not found ***********************
 */
app.use((req, res) => {
    res.sendStatus(404)
})

/*
********************** Start server ***********************
 */
app.listen(5400, () => {
    logger.info('Server running');
})
