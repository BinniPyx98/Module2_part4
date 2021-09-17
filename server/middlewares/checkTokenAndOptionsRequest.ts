import express, {NextFunction, Request, Response} from "express";
import {checkToken} from "../src/check/token/token.js";
import {requestLogging} from "../src/logger/requestLogging/requestLogging.js";
const router=express.Router()


router.all('*', (request: Request, response: Response, next: NextFunction) => {
    requestLogging(request);

    if (request.method === 'OPTIONS') {
        let responseWithAHeader = setHeaderForOptions(response)

        responseWithAHeader.end()
    }

    if (request.method == 'POST' && request.query.page || request.method == 'GET' && request.query.page) {
        checkToken(request, next, response);
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





export default router