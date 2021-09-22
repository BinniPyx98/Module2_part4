import {Request, Response} from "express";
import {checkPage} from "../check/pageInQuery/page.js";
import {getDbConnection} from "../../index.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>
 */
export function getHandler(request: Request, response: Response): void {


    if (checkPage(request, response)) {
        (async () => {
            await createGalleryObjectAndSendResponse(response, request)
        })()
    }


}

async function createGalleryObjectAndSendResponse(response: Response, request: Request) {
    let dbConnection = getDbConnection()
    let pageNumber = Number(request.query.page)
    let imagePathArray: Array<string> = []  //img path array


    try {
        let result = await dbConnection.collection(`page${pageNumber}`).find().toArray()

        for (const file of result) {
            imagePathArray.push(String(file.path))
        }

        let galleryObj = {
            total: 3,
            page: Number(pageNumber),
            objects: imagePathArray
        }

        response.send(JSON.stringify(galleryObj))

    } catch (err) {
        console.log(err)
    }

}


