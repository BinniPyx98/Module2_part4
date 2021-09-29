import {NextFunction, Request, Response} from "express";
import {logger} from "../../logger/logger.js";
import {imageModel, userModel} from "../../DbModels/Models.js";
import jwt from 'jsonwebtoken'

/*
 * Check token in request headers
 */

export function checkToken(request: Request, response: Response): boolean {


    const tokenKey = '1a2b-3c4d-5e6f-7g8h'
    let tokenPresent
    if (request.headers.authorization) {
        jwt.verify(request.headers.authorization, tokenKey, function(err, decoded) {
          tokenPresent=decoded.id // bar
        });

    }

    return tokenPresent

}