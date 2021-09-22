import {Request, Response} from "express";
import {getDb} from "../../index.js";
import logger from "../logger/logger.js";
import im from 'imagemagick'
import {readdir} from "fs/promises";
import {__dirname} from "../gallery/getGallery.js";
import {fileMetadataAsync} from 'file-metadata';



export async function saveImgInDb(req: Request, res: Response) {

    let image = {
        path: `/img/page${req.query.page}/` + req.files.img.name,
        metadata: await fileMetadataAsync(__dirname +`/img/page${req.query.page}/` + req.files.img.name)
    };
   // console.log(fileMetadataSync(req.files.img))
    let result = searchImgInDb(image,req.query.page)

    if (result) {
        res.status(200).send({message: "img was add"})
    } else {
        res.sendStatus(500)
    }
}


function searchImgInDb(image,pageNumber) {
    let dbConnection = getDb()
    let result: boolean

    dbConnection.collection(`page${pageNumber}`).findOne({path: image.path}, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (!doc) {
                result = insertImg(dbConnection, image,pageNumber)
            } else {
                console.log({errorMessage: 'img exist'})
                result = false
            }
        }
    })
    return result
}

function insertImg(dbConnection, image,pageNumber) {
    let status
    dbConnection.collection(`page${pageNumber}`).insertOne(image, function (err, DbResult) {
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

async function getMeta(imageName, pageNumber) {
    im.readMetadata(__dirname + `/img/page${pageNumber}/${imageName}`, (error, exifData) => {
        if (error) throw error;
        console.log('Shot at ' + exifData);
    })
}


export async function saveAllImage() {

    for (let i = 1; i <= 3; i++) {
        const files = await readdir(__dirname + `/img/page${i}`);
        for (const file of files) {
            let image = {
                path: `/img/page${i}/` + file,
                metadata: await fileMetadataAsync(__dirname +`/img/page${i}/` + file)
            };
            searchImgInDb(image,i)
        }


    }
}
