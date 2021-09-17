import {NextFunction, Request, Response} from "express";
import logger from "../../logger/logger.js";

export function checkToken(request: Request, next: NextFunction, response: Response): void {
    if (request.headers.authorization === 'token') {
        next();
    } else {
        logger.info('Not authorization');
        response.send({errorMessage:'Not authorization'});
    }
}