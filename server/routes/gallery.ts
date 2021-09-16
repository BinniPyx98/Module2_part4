import express from 'express'
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/uploadImage/postImageHandler.js";
import {getHandler} from "../src/gallery/getGallery.js";



router.post('/',(request: Request, response: Response) => {

    if (Number(request.query.page) > 3) {
        response.send("server haven't this page")
    } else {
        let result = postImageHandler(request);

        if (result) {
            response.sendStatus(200);
        } else {
            response.sendStatus(500);
        }
    }

})


router.get('/', (request: Request, response: Response) => {
    let result = getHandler(request);
    console.log(result)
    response.send(result);
})
export default router