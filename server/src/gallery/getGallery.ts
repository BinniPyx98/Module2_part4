import {Request, Response} from "express";
import {imageModel} from "../DbModels/Models.js";
import {getUserIdFromToken} from "../getUserIdFromToken/getUserIdFromToken.js";
import {checkFilterAndFindInDb} from "../checkFilterAndFindImageInDb/checkFilterAndFindInDb.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>&filter=<filter>
 */
export async function getHandler(request: Request, response: Response) {
    let dbResult = await checkFilterAndFindInDb(request)
    await createGalleryObjectAndSendResponse(request, dbResult, response)

}


async function createGalleryObjectAndSendResponse(request: Request, dbResult, response: Response) {

    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    let imagePathArray: Array<string> = []  //img path array

    try {
        let total = Math.ceil(Number(dbResult.img.length) / limit)

        for (let file of dbResult.result) {
            // @ts-ignore
            imagePathArray.push(String(file.path))
        }

        let galleryObj = {
            total: total,
            page: Number(pageNumber),
            objects: imagePathArray
        }

        response.send(JSON.stringify(galleryObj))

    } catch (err) {
        console.log(err)
    }

}


