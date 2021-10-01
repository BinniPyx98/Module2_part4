import express, {NextFunction, Request, Response} from "express";
import {checkToken} from "../src/check/token/token.js";
import {requestLogging} from "../src/logger/requestLogging/requestLogging.js";
import {logger} from '../src/logger/logger.js'
const router = express.Router()

/*
 *Перехватывает все реквесты и проверяет наличие токена и options для cors
 */
router.all('*', (request: Request, response: Response, next: NextFunction) => {
    requestLogging(request);

    if (request.method === 'OPTIONS') {
        let responseWithAHeader = setHeaderForOptions(response)

        responseWithAHeader.end()
    }
    /*
     *  check token
     */
    // (async () => {
    //     let result = await checkToken(request, response)
    //
    //     if (result) {
    //         logger.info(`User ${result._id} has token`)
    //         next()
    //     } else {
    //         logger.info(`User not found by token `)
    //         response.status(401).send({errorMessage: 'not token'})
    //     }
    //
    //
    // })()

next()
});


function setHeaderForOptions(response: Response): Response {
    response.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET")
    response.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization, Accept")
    response.setHeader("Access-Control-Max-Age", "86400")
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader("Access-Control-Allow-Credentials", "true");

    response.writeHead(200)
    return response
}


export default router