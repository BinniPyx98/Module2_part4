
///////////Post Handler
const logger = require('../logger/logger');
import {checkUserAuthorizationData} from "../authorization";

type AuthResult = {errorMessage:"authorization error"}| { token: string }
let authResult: AuthResult

export  function postAuthHandler(request: any ) {

    let authData=request.body
    console.log(authData)
    logger.info('auth data:'+JSON.stringify(authData))
    authResult=checkUserAuthorizationData( authData)
    return JSON.stringify(authResult)
}