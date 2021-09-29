import express from 'express'
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/uploadImage/postImageHandler.js";
import {getHandler} from "../src/gallery/getGallery.js";
import checkTokenAndOptionsRequest from "../middlewares/checkTokenAndOptionsRequest.js";


/*
 * Upload image to the server
 */
router.use(checkTokenAndOptionsRequest)

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
