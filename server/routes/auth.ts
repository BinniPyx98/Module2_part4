import {Request,Response, NextFunction} from "express";
import passport from "passport";
import express from 'express'
import {authorization} from "../src/auth/authorization.js";
import {sendErrorMessage} from "../src/errorMessage/sendErrorMessage";
const router=express.Router()


router.post('/',  async function (req: Request, res: Response, next: NextFunction)  {
    passport.authenticate('login', async (err, user, data) => {
if(user){

    req.login(user, {session: false}, async (err) => {
        if (err) return next(err);

        authorization(req,res,user)

    });
}
else{
    authorization(req,res,{
        data:{errorMessage:'false user'},
        error:true
    })
}

    })(req, res, next);
} )


export default router
