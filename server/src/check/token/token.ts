import {NextFunction, Request, Response} from "express";
import {logger} from "../../logger/logger.js";
import {imageModel, userModel} from "../../DbModels/Models.js";

/*
 * Check token in request headers
 */

export function checkToken(request: Request, next: NextFunction, response: Response): void {
    const userToken=request.headers.authorization

    userModel.findOne({token: userToken}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (doc) {
               next()
            } else {
                logger.info('Not authorization');
                response.send({errorMessage:'Not authorization'});
            }
        }
    })

    // if (request.headers.authorization === 'token') {
    //     next();
    // } else {
    //     logger.info('Not authorization');
    //     response.send({errorMessage:'Not authorization'});
    // }
}