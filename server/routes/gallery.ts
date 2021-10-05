import express from 'express'
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/gallery/uploadImage/postImageHandler.js";
import {getHandler} from "../src/gallery/getGallery.js";


/*
 * Upload image to the server
 */

router.post('/',(request: Request, response: Response) => {

       postImageHandler(request,response);

})

/*
 * Sending gallery to client
 */
router.get('/', (request: Request, response: Response) => {
   getHandler(request,response);
})

export default router
