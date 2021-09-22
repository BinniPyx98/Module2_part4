
import * as swaggerUI from "swagger-ui-express";
import * as path from 'path';
import YAML from 'yamljs';

import  fileUpload from 'express-fileupload';
import express from 'express';
import config from 'config';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import auth from './routes/auth.js' ;
import  gallery from './routes/gallery.js';
import home from './routes/home.js';
import router from './middlewares/checkTokenAndOptionsRequest.js'
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './docs/openapi/api.yml'));

app.use(express.json())
app.use(fileUpload({}));

app.use('*',router)
app.use("/auth", auth);
app.use("/", home);
app.use("/gallery", gallery);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static(config.get('ClientPath')));
app.use('/img', express.static( 'src/gallery/img'));



export default app