import {checkAuthData} from "../check/authData/authData.js";
import {Request, Response} from "express";
import passport from 'passport'
import strategy from 'passport-local'
import {userModel} from "../DbModels/Models";
let LocalStrategy=strategy.Strategy
/*
 * If checkAuthData success, send token to user
 */
export async function authorization(request: Request, response: Response) {

    let authData = request.body;
    let authResult = await checkAuthData(authData);

    console.log(authResult.data);

    if(authResult.error===false) {
        response.status(200).send(JSON.stringify(authResult.data));
    }
    else{
        response.status(401).send(JSON.stringify(authResult.data));
    }


    passport.use(new LocalStrategy(
        function(username, password, done) {
            // userModel.findOne({ username: username }, function (err, user) {
            //     if (err) { return done(err); }
            //     if (!user) { return done(null, false); }
            //     if (!user.verifyPassword(password)) { return done(null, false); }
            //     return done(null, user);
            // });
        }
    ));

}