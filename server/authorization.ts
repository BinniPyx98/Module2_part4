//////Authorization
type AuthResult = {errorMessage:"authorization error"}| { token: string }
const logger = require('./logger/logger');

interface UserAuthDBData {
    [email: string]: string;
}
let userAuthDBData: UserAuthDBData = {
    "asergeev@flo.team": 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team'
}


export function checkUserAuthorizationData(authData: any): AuthResult {
    let userDataFromQuery = authData
    let userPasswordFromQuery = userDataFromQuery.password
    let userEmailFromQuery = userDataFromQuery.email

    let emailDbStatus = checkEmailInDB(userEmailFromQuery) //Совпадает ли email
    let passwordDbStatus = checkPasswordInDB(userPasswordFromQuery, userEmailFromQuery)//Совпадает ли password

    let authorizationStatus = passwordDbStatus && emailDbStatus

    if (authorizationStatus == true) {
        logger.info('successful authorization')
        return {token: "token"}

    } else {
        logger.info('authorization error')
        return {errorMessage:"authorization error"}
    }
}

function checkEmailInDB(userEmailFromQuery: string): boolean {
    return userAuthDBData.hasOwnProperty(userEmailFromQuery)
}

function checkPasswordInDB(userPasswordFromQuery: string, UserEmailFromQuery: string): boolean {
    let passwordInDB = userAuthDBData[UserEmailFromQuery]

    return passwordInDB === userPasswordFromQuery ? true : false
}