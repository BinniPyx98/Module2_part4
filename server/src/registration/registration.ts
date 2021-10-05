import {Request, Response} from "express";
import {sendErrorMessage} from "../errorMessage/sendErrorMessage.js";
import {logger} from "../logger/logger.js";
import crypto from 'crypto'
import {userModel} from "../DbModels/UsersSchema.js";
async function registration (request: Request, response: Response)  {
    let authData = request.body;

    const userExist = await checkUserInDb(authData)
    if (userExist) {
        logger.info('This email address is already in use.')
        sendErrorMessage(response, {errorMessage: "This email address is already in use."})
    } else {
        console.log('Error test')
        const newUser = createNewUser(authData);

        addUserInDb(newUser)
        response.sendStatus(200);

    }
}


const createNewUser = (authData) => {
    const [userPasswordFromQuery, userEmailFromQuery] = [authData.password, authData.email]
    let hashPass = crypto.createHash('sha256').update(userPasswordFromQuery).digest('hex');




    const newUser = new userModel( {
        email: userEmailFromQuery,
        password: hashPass
    })

    return newUser

}

async function checkUserInDb(authData) {
    const userEmailFromQuery =  authData.email
    let userPresenceInDb;

    userPresenceInDb = await userModel.findOne({email: userEmailFromQuery});

    return userPresenceInDb
}

function addUserInDb(newUser){

    newUser.save(function (err, DbResult) {

        if (err) {
            console.log(err);
            logger.info(err)
        }
        logger.info(DbResult)
    });

}
export default registration