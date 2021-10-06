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
import registration from './routes/registration.js'

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));

const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));

app.use(express.json())
app.use(fileUpload({}));
 usePassport()

import passport from 'passport';
import {clientErrorHandler, errorHandler, logErrors} from "./src/errorHandlers/errorHandlers.js";
import {usePassport} from "./src/passport/passport.js";
app.use(passport.initialize())


app.use("/auth", auth);
app.use("/", home);
app.use("/registration", registration)
app.use("/gallery", passport.authenticate('jwt', { session: false }),gallery);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static(config.get('ClientPath')));
app.use(express.static(`${config.get('ClientPath')}/..`));
app.use('/img', express.static('src/gallery/img'));


app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)






export default app














