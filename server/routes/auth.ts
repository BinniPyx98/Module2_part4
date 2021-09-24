import {authorization} from "../src/auth/authorization.js";
import express from 'express'
const router=express.Router()


router.post('/',  authorization )


export default router
