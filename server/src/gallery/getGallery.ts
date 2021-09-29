import {Request, Response} from "express";
import {imageModel} from "../DbModels/Models.js";
import {getUserIdFromToken} from "../getUserIdFromToken/getUserIdFromToken.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>&filter=<filter>
 */
export async function getHandler(request: Request, response: Response) {

  let dbResult=await checkFilterAndFindInDb(request)
    createGalleryObjectAndSendResponse(response,dbResult,request )

}

async function checkFilterAndFindInDb(request:Request){

    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    const userIdFromRequest = await getUserIdFromToken(request)
    let result
    if(request.query.filter==='All'){
         result = await imageModel.find(
            {
                $or: [{userId: userIdFromRequest}, {userId: 'allUsers'}]
            }).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)

    }else{

         result = await imageModel.find(
            {userId: userIdFromRequest}).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)

    }
    return result
}

async function createGalleryObjectAndSendResponse(response: Response,request:Request,dbResult ) {
    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    let imagePathArray: Array<string> = []  //img path array

    try {
        let total = Math.ceil(Number(Number(await imageModel.count()) / limit))


        for (let file of dbResult) {
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


