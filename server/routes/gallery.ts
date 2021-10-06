import express from 'express'
const router = express.Router()
import {Request, Response} from "express";
import {postImageHandler} from "../src/gallery/uploadImage/postImageHandler.js";
import {getHandler} from "../src/gallery/getGallery.js";


/*
 * Upload image to the server
 */

router.post('/', postImageHandler)

/*
 * Sending gallery to client
 */
router.get('/', getHandler )
export default router
