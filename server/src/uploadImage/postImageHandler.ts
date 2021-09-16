import logger from'../../logger/logger.js';
import fs from 'fs'
import internal from "stream";
import {Request} from "express";
let galleryPageNumber: Number = 1;
let imageName: String = '';
//import {Request} from "express";

declare module 'express' {
    interface Request {
        body: any // Actually should be something like `multer.Body`
        files: any // Actually should be something like `multer.Files`
    }
}
export function postImageHandler(request: Request) {

    let fileData = request.files.img;

    galleryPageNumber = Number(request.query.page)
    imageName = fileData.name

    if (fileData) {
        logger.info('postImageHandler gallery img')
        saveImg(galleryPageNumber, imageName, fileData.data)
        return true
    } else {
        logger.info('Image upload error')
        return false
    }
}

function saveImg(galleryPageNumber: Number, imageName: String, Image: any) {
    fs.writeFile(`./img/page${galleryPageNumber}/${imageName}`, Image, () => {
        logger.info('Image success saved')
    })
}