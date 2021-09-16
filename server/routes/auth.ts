import {postHandler} from "../src/auth/postAuthHandler";
import {Response, Request} from "express";
const express=require('express')
const router=express.Router()



router.post('/', (request: Request, response: Response) => {
    let result = JSON.parse(postHandler(request))

     response.send(result)
})

module.exports=router;

