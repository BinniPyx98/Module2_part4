import {logger} from '../logger/logger.js';
import fs from 'fs'
import {Request, Response} from "express";
import {saveImgInDb} from "../saveInDb/saveInDb.js";
import {__pathToGallery} from "../gallery/pathToGallery.js";

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

        trySaveToDir( imageName, fileData.data, response)

        trySaveToMongoDb(request, response)

    } else {
        logger.info({errorMessage: 'request.files error'})
    }
}

 function trySaveToDir( imageName: String, Image: Buffer, response) {
    try {

        fs.writeFile(`${__pathToGallery}/img/${imageName}`, Image, {flag:'wx'},(err) => {
            console.log(err)
            logger.info({message: 'Image success saved in dir'})
        })

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'file exist'})
        response.status(500).send({errorMessage: 'file exist'})
    }

}

function trySaveToMongoDb(request:Request, response:Response) {
    try {
      saveImgInDb(request, response)

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'postImageHandler: error save to db'})
        response.status(500).send({errorMessage: 'postImageHandler: error save to db'})
    }
}