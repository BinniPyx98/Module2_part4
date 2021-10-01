import {NextFunction, Request, Response} from "express";
import {logger} from "../../logger/logger.js";
import {imageModel, userModel} from "../../DbModels/Models.js";
import jwt from 'jsonwebtoken'

/*
 * Check token in request headers
 */

let tokenStatus

export function getTokenStatus(){
    return tokenStatus
}

export async function checkToken(request: Request, response: Response) {


    const tokenKey = '1a2b-3c4d-5e6f-7g8h'
    let tokenPresent
    if (request.headers.authorization) {
      let test=  await jwt.verify(request.headers.authorization, tokenKey, function(err, decoded) {

          tokenPresent =  userModel.findOne({_id: decoded.id})

        //  tokenPresent=decoded.id // bar
        });

    }

    return tokenPresent

}


//
// if (request.headers.authorization) {
//         jwt.verify(request.headers.authorization, tokenKey, async function (err, decoded) {
//
//             tokenPresent = await userModel.findOne({_id: decoded.id})
//
//             if (tokenPresent) {
//                 id = decoded.id
//             } else {
//                 id = false
//             }
//
//
//         });
//
//     }
//     console.log(id)
//     return id