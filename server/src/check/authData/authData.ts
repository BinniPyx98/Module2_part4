//////Authorization

import logger from '../../logger/logger.js';

interface AuthResult {
    error: boolean;
    data: {
        token?: string;
        errorMessage?: string;
    }
}


interface UserAuthDBData {
    [email: string]: string;
}

let userAuthDBData: UserAuthDBData = {
    "asergeev@flo.team": 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team'
}


export function checkAuthData(authData): AuthResult {


    let userDataFromQuery = authData
    let userPasswordFromQuery = userDataFromQuery.password
    let userEmailFromQuery = userDataFromQuery.email

    let emailDbStatus = checkEmailInDB(userEmailFromQuery)
    let passwordDbStatus = checkPasswordInDB(userPasswordFromQuery, userEmailFromQuery)

    let authorizationData = passwordDbStatus && emailDbStatus
    if (authorizationData == true) {
        logger.info('successful authorization')
        return {error: false, data:{token: "token"}}

    } else {
        logger.info('authorization error')
        return {error: true, data:{errorMessage: 'authorization error'}}
    }
}

function checkEmailInDB(userEmailFromQuery: string): boolean {
    return userAuthDBData.hasOwnProperty(userEmailFromQuery)
}

function checkPasswordInDB(userPasswordFromQuery: string, UserEmailFromQuery: string): boolean {
    let passwordInDB = userAuthDBData[UserEmailFromQuery]

    return passwordInDB === userPasswordFromQuery ? true : false
}