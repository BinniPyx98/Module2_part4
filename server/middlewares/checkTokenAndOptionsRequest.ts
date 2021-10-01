import express, {NextFunction, Request, Response} from "express";
import {checkToken} from "../src/check/token/token.js";
import {requestLogging} from "../src/logger/requestLogging/requestLogging.js";

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
    (async () => {
        let result = await checkToken(request, response)

        if (result) {
            logger.info(`User ${result._id} has token`)
            next()
        } else {
            logger.info(`User not found by token `)
            response.status(401).send({errorMessage: 'not token'})
        }


    })()


});


function setHeaderForOptions(response: Response): Response {
    response.setHeader('Access-Control-Allow-Methods', "PUT,PATCH,DELETE,POST,GET")
    response.setHeader("Access-Control-Allow-Headers", "API-Key,Content-Type,If-Modified-Since,Cache-Control,Access-Control-Allow-Methods, Authorization")
    response.setHeader("Access-Control-Max-Age", "86400")
    response.setHeader('Access-Control-Allow-Origin', '*')

    response.writeHead(200)
    return response
}

import passport from 'passport'
import strategy from 'passport-local'
import {logger} from "../src/logger/logger";

let LocalStrategy = strategy.Strategy

passport.use(new LocalStrategy(
    function (email, password, done) {
        // userModel.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        // });
        console.log("userName " + email)
        console.log("password " + password)
    }
));


export default router