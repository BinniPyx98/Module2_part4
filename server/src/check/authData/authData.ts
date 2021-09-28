import {logger} from '../../logger/logger.js';
import {userModel} from "../../DbModels/Models.js";
import jwt from 'jsonwebtoken'

export async function checkAuthData(authData) {

    const tokenKey = '1a2b-3c4d-5e6f-7g8h'

    const [userPasswordFromQuery, userEmailFromQuery] = [authData.password, authData.email]
    let userPresenceInDb;

    userPresenceInDb = await userModel.findOne({email: userEmailFromQuery});
    const userId=userPresenceInDb.__id

    /*
     * If user presence in db check password
     */
    if (userPresenceInDb) {

        if (userPresenceInDb.password === userPasswordFromQuery) {
            logger.info('successful authorization');
            userPresenceInDb = {
                error: false,
                data: {
                    token: jwt.sign({id: userId}, tokenKey),
                }
            };
        }

    } else {
        logger.info('authorization error');
        userPresenceInDb = {error: true, data: {errorMessage: 'authorization error'}};
    }

    return userPresenceInDb;
}


