import {Request, Response} from "express";

import {readdir} from 'fs/promises';
import {checkPage} from "../check/pageInQuery/page.js";
import path from 'path'


import {dirname} from 'path';
import {fileURLToPath} from 'url';
import app from "../../server";
import {getDb} from "../../index.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


export function getHandler(request: Request, response: Response): void {


    if (checkPage(request, response)) {
        (async () => {
            await createGalleryObjectAndSendResponse(response, request)
        })()
    }


}


async function createGalleryObjectAndSendResponse(response: Response, request: Request) {
    let dbConnection = getDb()
    let pageNumber = Number(request.query.page)
    let arr: Array<string> = []

    try {


        dbConnection.collection(`page${pageNumber}`).find().toArray((err, docs) => {

            if (err) {
                console.log(err)
                response.sendStatus(500)
            } else {
                for (const file of docs) {
                    arr.push(String(file.path))
                    console.log(file.path)
                }


                let galleryObj = {
                    total: 3,
                    page: Number(pageNumber),
                    objects: arr
                }

                console.log(galleryObj)
                response.send(JSON.stringify(galleryObj))



            }
        })

        //
        // const files = await readdir(__dirname + `/img/page${pageNumber}`);
        // for (const file of files) {
        //     arr.push(path.join(`/img/page${pageNumber}/`, file).toString())
        // }



    } catch (e) {
        console.log(e)
    }

}


