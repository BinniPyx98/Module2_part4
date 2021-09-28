import {userModel} from "../DbModels/Models.js";
import {Request, Response} from "express";
import {sendErrorMessage} from "../errorMessage/sendErrorMessage.js";
import {logger} from "../logger/logger.js";

async function registration (request: Request, response: Response)  {

    let authData = request.body;

    const userExist = await checkUserInDb(authData)
    if (userExist) {
        sendErrorMessage(response, {errorMessage: "This email address is already in use."})
    } else {
        const newUser = createNewUser(authData);
        addUserInDb(newUser)
        response.sendStatus(200);

    }
}


const createNewUser = (authData) => {
    const [userPasswordFromQuery, userEmailFromQuery] = [authData.password, authData.email]

    const newUser = new userModel( {
        email: userEmailFromQuery,
        password: userPasswordFromQuery
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