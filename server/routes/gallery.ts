import express from 'express'
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/uploadImage/postImageHandler.js";
import {getHandler} from "../src/gallery/getGallery.js";


/*
 * Upload image to the server
 */
router.post('/',(request: Request, response: Response) => {

    if (Number(request.query.page) > 3) {
        response.status(404).send({errorMessage:"server haven't this page"})
    } else {
       postImageHandler(request,response);

    }

})

/*
 * Sending gallery to client
 */
router.get('/', (request: Request, response: Response) => {
   getHandler(request,response);
})

export default router