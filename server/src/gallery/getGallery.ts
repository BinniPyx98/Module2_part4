import {Request, Response} from "express";
import {imageModel} from "../DbModels/Models.js";
import {getUserIdFromToken} from "../getUserIdFromToken/getUserIdFromToken.js";


/*
 * work aster user do get request on http://localhost:5400/gallery?page=<pageNumber>&filter=<filter>
 */
export async function getHandler(request: Request, response: Response) {

  let dbResult=await checkFilterAndFindInDb(request)
    await createGalleryObjectAndSendResponse(request,dbResult,response )

}

async function checkFilterAndFindInDb(request:Request){

    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    const userIdFromRequest = await getUserIdFromToken(request)
    let result
    let img
    if(request.query.filter==='All'){
         result = await imageModel.find(
            {
                $or: [{userId: userIdFromRequest}, {userId: 'allUsers'}]
            }).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)
        img= await imageModel.find(
            {
                $or: [{userId: userIdFromRequest}, {userId: 'allUsers'}]
            }).lean()

    }else{
        console.log('userIdFromRequest'+userIdFromRequest)
         result = await imageModel.find(
            {userId: userIdFromRequest}).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)
        img= await imageModel.find(
            {userId: userIdFromRequest}).lean()
    }

    return {result:result,img:img}
}

async function createGalleryObjectAndSendResponse(request:Request,dbResult,response: Response ) {

    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    let imagePathArray: Array<string> = []  //img path array

    try {
        let total = Math.ceil(Number(dbResult.img.length) / limit)

      //  let total2 = Math.ceil(result) / limit))

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


