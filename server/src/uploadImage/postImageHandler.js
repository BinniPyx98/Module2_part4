import logger from '../../logger/logger.js';
import fs from 'fs';
let galleryPageNumber = 1;
let imageName = '';
export function postImageHandler(request) {
    let fileData = request.files.img;
    galleryPageNumber = Number(request.query.page);
    imageName = fileData.name;
    if (fileData) {
        logger.info('postImageHandler gallery img');
        saveImg(galleryPageNumber, imageName, fileData.data);
        return true;
    }
    else {
        logger.info('Image upload error');
        return false;
    }
}
function saveImg(galleryPageNumber, imageName, Image) {
    fs.writeFile(`./img/page${galleryPageNumber}/${imageName}`, Image, () => {
        logger.info('Image success saved');
    });
}
//# sourceMappingURL=postImageHandler.js.map