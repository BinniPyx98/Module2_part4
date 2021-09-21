import logger from '../logger/logger.js';
import fs from 'fs'
import {Request, Response} from "express";
import {saveImgInDb} from "../saveInDb/saveInDb.js";
import fsm from 'fs-meta'
import path from 'path'
import {dirname} from 'path';

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let galleryPageNumber: Number = 1;
let imageName: String = '';

// declare module 'express' {
//     interface Request {
//         body: any // Actually should be something like `multer.Body`
//         files: any // Actually should be something like `multer.Files`
//     }
// }

export function postImageHandler(request: Request, response: Response): void {

    let fileData = request.files.img;

    galleryPageNumber = Number(request.query.page)
    imageName = fileData.name

    if (fileData) {
        logger.info({message: 'postImageHandler: try upload img'})

        trySaveToDir(galleryPageNumber, imageName, fileData.data, response)

        trySaveToMongoDb(request, response)

    } else {
        logger.info({errorMessage: 'request.files error'})
    }
}

 function trySaveToDir(galleryPageNumber: Number, imageName: String, Image: any, response) {
    try {



        fs.writeFile(`./img/page${galleryPageNumber}/${imageName}`, Image, () => {
            logger.info({message: 'Image success saved in dir'})
        })

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'postImageHandler: error save to dir'})
        response.status(500).send({errorMessage: 'postImageHandler: error save to dir'})
    }

}

function trySaveToMongoDb(request, response) {
    try {
        saveImgInDb(request, response)

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'postImageHandler: error save to db'})
        response.status(500).send({errorMessage: 'postImageHandler: error save to db'})
    }
}