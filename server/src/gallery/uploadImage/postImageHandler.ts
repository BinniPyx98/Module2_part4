import {logger} from '../../logger/logger.js';
import fs from 'fs'
import {Request, Response,NextFunction} from "express";
import {saveImgInDb} from "../saveInDb/saveInDb.js";
import {__pathToGallery} from "../pathToGallery.js";

let galleryPageNumber: Number = 1;
let imageName: String = '';


/*
 * upload image in dir and db
 */
declare module 'express' {
    interface Request {
        body: any // Actually should be something like `multer.Body`
        files: any // Actually should be something like `multer.Files`
    }
}


export function postImageHandler(request: Request, response: Response,next:Function): void {

    let fileData = request.files.img;

    galleryPageNumber = Number(request.query.page)
    imageName = fileData.name


    if (fileData) {
        logger.info({message: 'postImageHandler: try upload img'})

        trySaveToDir(imageName, fileData.data, response,next)

        trySaveToMongoDb(request, response)

    } else {
        logger.info({errorMessage: 'request.files error'})
    }
}

function trySaveToDir(imageName: String, Image: Buffer, response,next) {

    fs.writeFile(`${__pathToGallery}/img/${imageName}`, Image, {flag: 'wx'}, (err) => {
        if (err) {
            console.log(err)
            response.status(208).send({errorMessage:err})
            next(err)
        } else {
            logger.info({message: 'Image success saved in dir'})
        }
    })

}

function trySaveToMongoDb(request: Request, response: Response) {
    try {
        saveImgInDb(request, response)

    } catch (err) {
        console.log(err)
        logger.info({errorMessage: 'trySaveToMongoDb: error save to db'})
        response.status(500).send({errorMessage: 'trySaveToMongoDb: error save to db'})
        throw new Error('fail trySaveToMongoDb')

    }
}