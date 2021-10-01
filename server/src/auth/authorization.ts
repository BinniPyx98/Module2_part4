import {Request, Response} from "express";

/*
 * If checkAuthData success, send token to user
 */
export async function authorization(request: Request, response: Response, authResult2) {

    let authResult = await authResult2
    console.log('log aut data ' + authResult.data);

    if (authResult.error === false) {
        response.status(200).send(JSON.stringify(authResult.data));
    } else {
        response.status(401).send(JSON.stringify(authResult.data));
    }


}

