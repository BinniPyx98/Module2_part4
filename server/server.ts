import * as swaggerUI from "swagger-ui-express";
import * as path from 'path';
import YAML from 'yamljs';
import cors from 'cors';

import fileUpload from 'express-fileupload';
import express from 'express';
import config from 'config';


import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import auth from './routes/auth.js' ;
import gallery from './routes/gallery.js';
import home from './routes/home.js';
import checkTokenAndOptionsRequest from './middlewares/checkOptionsRequest.js'
import registration from './routes/registration.js'

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));

app.use(express.json())
app.use(fileUpload({}));

import {checkAuthData} from "./src/check/authData/authData.js";


import passport from 'passport';

import strategy from 'passport-local'
let LocalStrategy = strategy.Strategy

import JWTstrategy, {VerifiedCallback} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import crypto from "crypto";


app.use(passport.initialize())

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (username, password, done) {
        let hashPass = crypto.createHash('sha256').update(password).digest('hex');
        let authResult=await checkAuthData({email:username,password:hashPass})
        return done(null, authResult);
    }
));


passport.use( new JWTstrategy.Strategy({
     secretOrKey: '1a2b-3c4d-5e6f-7g8h',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done: VerifiedCallback) => {
    console.log('token on use '+token.id)
    try {
        return done(null, token.id);
    } catch (e) {
        return done(e);
    }
}))

app.use('*',checkTokenAndOptionsRequest)
app.use("/auth", auth);
app.use("/", home);
app.use("/registration", registration)
app.use("/gallery", passport.authenticate('jwt', { session: false }),gallery);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static('src/gallery/img'));





export default app














