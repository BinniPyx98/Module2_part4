///////////Post Handler
import logger from '../../logger/logger.js';
import { checkUserAuthorizationData } from "./authorization.js";
let authResult;
export function postHandler(request) {
    let authData = request.body;
    console.log(authData);
    logger.info('uploadImage data:' + JSON.stringify(authData));
    authResult = checkUserAuthorizationData(authData);
    return JSON.stringify(authResult);
}
//# sourceMappingURL=postAuthHandler.js.map