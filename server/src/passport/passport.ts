import passport from "passport";
import crypto from "crypto";
import {checkAuthData} from "../auth/check/authData/authData.js";
import JWTstrategy, {VerifiedCallback} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import strategy from 'passport-local'
let LocalStrategy = strategy.Strategy
import config from 'config'

export function usePassport() {
    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (username, password, done) {
            let hashPass = crypto.createHash('sha256').update(password).digest('hex');
            let authResult = await checkAuthData({email: username, password: hashPass})
            return done(null, authResult);
        }
    ));


    passport.use(new JWTstrategy.Strategy({
        secretOrKey: config.get('secretOrKey'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (token, done: VerifiedCallback) => {
        console.log('token on use ' + token.id)
        try {
            return done(null, token.id);
        } catch (e) {
            return done(e);
        }
    }))
}