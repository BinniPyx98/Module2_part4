import {logger} from '../../logger/logger.js';
import {userModel} from "../../DbModels/Models.js";
import jwt from 'jsonwebtoken'

export async function checkAuthData(authData) {

    const tokenKey = '1a2b-3c4d-5e6f-7g8h'

    const [userPasswordFromQuery, userEmailFromQuery] = [authData.password, authData.email]
    let userPresenceInDb;
    let dbResult;
    dbResult = await userModel.findOne({email: userEmailFromQuery});

    /*
     * If user presence in db check password
     */
    console.log(dbResult)
    if (dbResult) {

        if (dbResult.password === userPasswordFromQuery) {
            logger.info('successful authorization');
            userPresenceInDb = {
                error: false,
                data: {
                    token: jwt.sign({id: dbResult._id}, tokenKey),
                }
            };
        }

    } else {
        logger.info('authorization error');
        userPresenceInDb = {error: true, data: {errorMessage: 'authorization error'}};
    }

    return userPresenceInDb;
}


