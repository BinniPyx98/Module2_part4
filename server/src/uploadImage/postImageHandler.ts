import logger from'../../logger/logger.js';
import fs from 'fs'
let galleryPageNumber: Number = 1;
let imageName: String = '';

export function postImageHandler(request: any) {
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