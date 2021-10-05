import {logger} from '../../../logger/logger.js';
import jwt from 'jsonwebtoken'
import config from 'config'
import {userModel} from "../../../DbModels/UsersSchema.js";
export async function checkAuthData(authData) {

    const tokenKey =   config.get('secretOrKey')


    const [userPasswordFromQuery, userEmailFromQuery] = [authData.password, authData.email]
    let userPresenceInDb;
    let dbResult;
    dbResult = await userModel.findOne({email: userEmailFromQuery});

    /*
     * If user presence in db check password
     */
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


