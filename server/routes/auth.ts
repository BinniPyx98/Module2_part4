import {authorization} from "../src/auth/authorization.js";
import {Response, Request} from "express";
import express from 'express'
const router=express.Router()



router.post('/', (request: Request, response: Response) => {
    authorization(request,response)

})

export default router
