const express = require('express')
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/uploadImage/postImageHandler";
import {getHandler} from "../src/gallery/getGallery";

router.post('/',(request: any, response: Response) => {

    if (request.query.page > 3) {
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
module.exports = router;
