import {Request, Response} from "express";
import {getDbConnection} from "../../index.js";
import logger from "../logger/logger.js";
import {readdir} from "fs/promises";
import {__pathToGallery} from "../gallery/pathToGallery.js";
import {fileMetadataAsync} from 'file-metadata';


/*
 * work after user request on upload file to the server
 */
export async function saveImgInDb(req: Request, res: Response) {

    let image = {
        path: `/img/page${req.query.page}/` + req.files.img.name,
        metadata: await fileMetadataAsync(__pathToGallery +`/img/page${req.query.page}/` + req.files.img.name)
    };

    let result = searchImgInDb(image,req.query.page)

    if (result) {
        res.status(200).send({message: "img was add"})
    } else {
        res.sendStatus(500)
    }
}


function searchImgInDb(image,pageNumber) {
    let dbConnection = getDbConnection()
    let result: boolean

    dbConnection.collection(`image`).findOne({path: image.path}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (!doc) {
                result = insertImg(dbConnection, image,pageNumber)
            } else {
                console.log({errorMessage: 'img exist in db'})
                result = false
            }
        }
    })
    return result
}

function insertImg(dbConnection, image,pageNumber) {
    let status

    dbConnection.collection(`image`).insertOne(image, function (err, DbResult) {

        if (err) {
            console.log(err);
            logger.info(err)
            status = false
        }
        console.log(DbResult)
        status = true
    });
    return status
}

/*
 * starts work after server.listen(port)
 */
export async function saveAllImage() {

    for (let i = 1; i <= 3; i++) {
        const files = await readdir(__pathToGallery + `/img/page${i}`);
        for (const file of files) {
            let image = {
                path: `/img/page${i}/` + file,
                metadata: await fileMetadataAsync(__pathToGallery +`/img/page${i}/` + file)
            };
            searchImgInDb(image,i)
        }


    }
}
