import express, {NextFunction, Request, Response} from "express";
import logger from "../logger/logger.js";
const router=express.Router()


router.all('*', (request: Request, response: Response, next: NextFunction) => {
    requestLogging(request);

    if (request.method === 'OPTIONS') {
        let responseWithAHeader = setHeaderForOptions(response)

        responseWithAHeader.end()
    }

    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkTokenAndOptionsRequest(request, next, response);
    } else {
        next();
    }
});




function setHeaderForOptions(response:Response):Response {
    response.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET")
    response.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization")
    response.setHeader("Access-Control-Max-Age", "86400")
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.writeHead(200)
    return response
}

function checkTokenAndOptionsRequest(request: Request, next: NextFunction, response: Response): void {
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
export default router