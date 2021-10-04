import {Request} from "express";
import jwt from 'jsonwebtoken'

export async function getUserIdFromToken(req: Request) {

    const tokenKey = '1a2b-3c4d-5e6f-7g8h'
    let tokenPresent
    let bearerHeader = req.headers.authorization

    if (req.headers.authorization) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, tokenKey, function (err, decoded) {
            tokenPresent = decoded.id // bar
        });
    }

    return tokenPresent

}