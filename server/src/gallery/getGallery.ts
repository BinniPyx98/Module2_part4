import {Request, Response} from "express";
import {imageModel} from "../DbModels/Models.js";
import {getUserIdFromToken} from "../getUserIdFromToken/getUserIdFromToken.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>
 */
export function getHandler(request: Request, response: Response): void {

    createGalleryObjectAndSendResponse(response, request)

}

async function createGalleryObjectAndSendResponse(response: Response, request: Request) {
    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    const userIdFromRequest = await getUserIdFromToken(request)
    let imagePathArray: Array<string> = []  //img path array

    try {
        let total = Math.ceil(Number(Number(await imageModel.count()) / limit))
        let result = await imageModel.find(
            {
                $or: [{userId: userIdFromRequest}, {userId: 'allUsers'}]
            }).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)

        for (let file of result) {
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


