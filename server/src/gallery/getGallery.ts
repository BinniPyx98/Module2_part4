import {Request, Response} from "express";
import {getDbConnection} from "../../index.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>
 */
export function getHandler(request: Request, response: Response): void {



        (async () => {
            await createGalleryObjectAndSendResponse(response, request)
        })()



}

 async function createGalleryObjectAndSendResponse(response: Response, request: Request) {
    let dbConnection = getDbConnection()
    let pageNumber = Number(request.query.page)
     let limit=Number(request.query.limit)
     console.log("page: "+pageNumber)
    let imagePathArray: Array<string> = []  //img path array


    try {
        let total=Math.ceil(await dbConnection.collection('image').count()/limit);

        let result =  await dbConnection.collection(`image`).find().skip((pageNumber-1)*limit).limit(limit).toArray();

        for (const file of result) {
            console.log(String(file.path))
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


