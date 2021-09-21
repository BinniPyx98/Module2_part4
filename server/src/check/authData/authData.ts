//////Authorization

import logger from '../../logger/logger.js';
import {getDb} from "../../../index.js";

interface AuthResult {
    error: boolean;
    data: {
        token?: string;
        errorMessage?: string;
    }
}


let emailDbStatus
let passwordDbStatus

interface UserAuthDBData {
    [email: string]: string;
}

let userAuthDBData: UserAuthDBData = {
    "asergeev@flo.team": 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team'
}


export async function checkAuthData(authData) {


    let userDataFromQuery = authData
    let userPasswordFromQuery = userDataFromQuery.password
    let userEmailFromQuery = userDataFromQuery.email

    let dbConnection= getDb()
    let result

    result=await dbConnection.collection(`users`).findOne({email: userEmailFromQuery})


    if (result) {
                    if (result.password === userPasswordFromQuery) {
                        logger.info('successful authorization')
                        result= {error: false, data: {token: "token"}}

                    }

                } else {
                    logger.info('authorization error')
                    result= {error: true, data: {errorMessage: 'authorization error'}}

                }

return result
}


