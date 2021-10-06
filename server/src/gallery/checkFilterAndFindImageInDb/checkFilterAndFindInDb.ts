import {Request} from "express";
import {getUserIdFromToken} from "../../getUserIdFromToken/getUserIdFromToken.js";
import {imageModel} from "../../DbModels/ImageSchema.js";


export async function checkFilterAndFindInDb(request: Request) {

    let pageNumber = Number(request.query.page)
    let limit = Number(request.query.limit)
    const userIdFromRequest = await getUserIdFromToken(request)
    let result
    let img

    if (request.query.filter === 'All') {
        img = await getImageForTotal__ForFilterAll(userIdFromRequest)
        result = await getImageForResponse__ForFilterAll(userIdFromRequest, pageNumber, limit)
    } else {
        img = await getImageForTotal__ForFilterMyImage(userIdFromRequest)
        result = await getImageForResponse__ForFilterMyImage(userIdFromRequest, pageNumber, limit)
    }

    return {result: result, img: img}
}


async function getImageForResponse__ForFilterAll(userIdFromRequest, pageNumber, limit) {
    let imageFromDb = await imageModel.find(
        {
            $or: [{userId: userIdFromRequest}, {userId: '615aae0509d876c365438bf0'}]
        }).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)


    return imageFromDb
}


async function getImageForResponse__ForFilterMyImage(userIdFromRequest, pageNumber, limit) {
    console.log('userIdFromRequest' + userIdFromRequest)
    let imageFromDb = await imageModel.find(
        {userId: userIdFromRequest}).lean().skip(Number((pageNumber - 1) * limit)).limit(limit)


    return imageFromDb
}

async function getImageForTotal__ForFilterAll(userIdFromRequest) {
    let imgForTotal = await imageModel.find(
        {
            $or: [{userId: userIdFromRequest}, {userId: '615aae0509d876c365438bf0'}]
        }).lean();

    return imgForTotal
}

async function getImageForTotal__ForFilterMyImage(userIdFromRequest) {
    let imgForTotal = await imageModel.find(
        {userId: userIdFromRequest}).lean();

    return imgForTotal
}