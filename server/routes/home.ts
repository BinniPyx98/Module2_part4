import {Request, Response} from "express";
import  config from 'config';
import {logger} from '../src/logger/logger.js';
import  express from'express'
import app from "../server.js";
const router=express.Router()

/*
 * Send index.html to user
 */


router.get('/', (request: Request, response: Response) => {
    console.log('get'+'home')
    logger.info(JSON.stringify(request.headers));
    response.sendFile(config.get('ClientPath'));
})


export default router