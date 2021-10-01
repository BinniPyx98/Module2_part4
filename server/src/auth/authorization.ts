import {checkAuthData} from "../check/authData/authData.js";
import {Request, Response} from "express";

import {userModel} from "../DbModels/Models";
/*
 * If checkAuthData success, send token to user
 */
export async function authorization(request: Request, response: Response) {

    let authData = request.body;
    let authResult = await checkAuthData(authData);

    console.log(authResult.data);

    if(authResult.error===false) {
        response.status(200).send(JSON.stringify(authResult.data));
    }
    else{
        response.status(401).send(JSON.stringify(authResult.data));
    }


}

