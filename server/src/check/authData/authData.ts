import logger from '../../logger/logger.js';
import {getDbConnection} from "../../../index.js";


export async function checkAuthData(authData) {


    const userDataFromQuery = authData;
    const userPasswordFromQuery = userDataFromQuery.password;
    const userEmailFromQuery = userDataFromQuery.email;

    let dbConnection = getDbConnection();
    let userPresenceInDb;

    userPresenceInDb = await dbConnection.collection(`users`).findOne({email: userEmailFromQuery});


    /*
     * If user presence in db check password
     */
    if (userPresenceInDb) {

        if (userPresenceInDb.password === userPasswordFromQuery) {
            logger.info('successful authorization');
            userPresenceInDb = {error: false, data: {token: "token"}};
        }

    } else {
        logger.info('authorization error');
        userPresenceInDb = {error: true, data: {errorMessage: 'authorization error'}};
    }

    return userPresenceInDb;
}


