import logger from '../logger/logger.js';
import fs from 'fs'
import {Request, Response} from "express";
import {saveImgInDb} from "../saveInDb/saveInDb.js";

let galleryPageNumber: Number = 1;
let imageName: String = '';

/*
 * upload image in dir and db
 */
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
        (async ()=>{await saveImgInDb(request, response)})()

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'postImageHandler: error save to db'})
        response.status(500).send({errorMessage: 'postImageHandler: error save to db'})
    }
}