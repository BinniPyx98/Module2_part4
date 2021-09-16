import {Request} from "express";

const fs = require('fs')
const path = require('path')

//////Get Handler
type GetHandler = string | {
    total: number,
    page: number,
    objects: Array<string>
}

export function getHandler(request: Request): GetHandler {

    try {
        console.log(request.query)

        let pageNumber = Number(request.query.page)

        if (request.headers.authorization === 'token') {
            let arr: Array<string>
            // Read img path
            try {
                arr = fs.readdirSync( __dirname+`/img/page${pageNumber}`)
                    .map((elem: any) => path.join( `/img/page${pageNumber}/`, elem).toString());
            } catch (e) {
                console.log(e)
            }


            let galleryObj = {
                total: 3,
                page: Number(pageNumber),
                objects: arr
            }
            console.log(galleryObj)
            return JSON.stringify(galleryObj)
        } else {
            return "Not authorization"
        }
    } catch (e) {
        return 'server havent this page'
    }
}