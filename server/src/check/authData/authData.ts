import {logger} from '../../logger/logger.js';
import {userModel} from "../../DbModels/Models.js";
//import {getDbConnection} from "../../../index.js";


export async function checkAuthData(authData) {

    const [userPasswordFromQuery,userEmailFromQuery]=[authData.password,authData.email]
    //let dbConnection = getDbConnection();
    let userPresenceInDb;

    userPresenceInDb = await userModel.findOne({email: userEmailFromQuery});


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


