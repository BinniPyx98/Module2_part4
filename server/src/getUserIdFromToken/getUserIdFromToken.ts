import {Request} from "express";
import jwt from 'jsonwebtoken'

export async function getUserIdFromToken(req: Request) {

    const tokenKey = '1a2b-3c4d-5e6f-7g8h'
    let tokenPresent

    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, tokenKey, function (err, decoded) {
            tokenPresent = decoded.id // bar
        });

    }

    return tokenPresent

}