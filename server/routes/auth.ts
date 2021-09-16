import {postHandler} from "../src/auth/postAuthHandler.js";
import {Response, Request} from "express";
import express from 'express'
const router=express.Router()



router.post('/', (request: Request, response: Response) => {
    let result = JSON.parse(postHandler(request))

     response.send(result)
})

export default router
