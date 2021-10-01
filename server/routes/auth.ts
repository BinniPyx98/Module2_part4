import {Request,Response, NextFunction} from "express";
import passport from "passport";
import express from 'express'
import {checkAuthData} from "../src/check/authData/authData.js";
import {authorization} from "../src/auth/authorization.js";
const router=express.Router()


router.post('/',  async function (req: Request, res: Response, next: NextFunction)  {
    passport.authenticate('login', async (err, user, data) => {


            req.login(user, {session: false}, async (err) => {
                if (err) return next(err);

                authorization(req,res,user)

            });

    })(req, res, next);
} )


export default router
