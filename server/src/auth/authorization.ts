import {Request, Response} from "express";

/*
 * If checkAuthData success, send token to user
 */
export async function authorization(request: Request, response: Response, user) {

    let authResult =  user
    console.log(authResult.error)
    if (authResult.error === false) {
        response.status(200).send(JSON.stringify(authResult.data));
    } else {
        response.status(401).send(JSON.stringify(authResult.data));
    }


}

