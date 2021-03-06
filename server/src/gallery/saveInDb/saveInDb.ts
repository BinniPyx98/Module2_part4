import {Request, Response} from "express";
import {logger} from "../../logger/logger.js";
import {readdir} from "fs/promises";
import {__pathToGallery} from "../pathToGallery.js";
import {fileMetadataAsync} from 'file-metadata';
import {getUserIdFromToken} from "../../getUserIdFromToken/getUserIdFromToken.js";
import {imageModel} from "../../DbModels/ImageSchema.js";

/*
 * work after user request on upload file to the server
 */
export async function saveImgInDb(req: Request, res: Response) {

    const userId = await getUserIdFromToken(req)

    let image = new imageModel({
        path: `/img/` + req.files.img.name,
        metadata: await fileMetadataAsync(__pathToGallery + `/img/` + req.files.img.name),
        userId: userId
    });

    let result = customInsertOne(image)

    if (result) {
        res.status(200).send({message: "img was add"})
    } else {
        res.status(500).send({errorMessage: "img exist"})
    }
}


function customInsertOne(image) {
    let result: boolean

    imageModel.findOne({path: image.path}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (!doc) {
                result = insertImg(image)
            } else {
                console.log({errorMessage: 'img exist in db'})
                result = false
            }
        }
    })
    return result
}

function insertImg(image) {
    let status

    image.save(function (err, DbResult) {

        if (err) {
            console.log(err);
            logger.info(err)
            status = false
        }
        logger.info(DbResult)
        status = true
    });
    return status
}

/*
 * starts work after server.listen(port)
 */
export async function saveAllImage() {

    const files = await readdir(__pathToGallery + `/img`);

    for (const file of files) {
        let image = new imageModel({
            path: `/img/` + file,
            metadata: await fileMetadataAsync(__pathToGallery + `/img/` + file),
            userId: 'allUsers'

        });
        customInsertOne(image)
    }


}

