import { NextFunction, Request, Response } from 'express'
import User  from '../models/User';
import config from "../services/config";

import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token
        if(!token)throw new Error('Invalid token')
        const {email} : any = jwt.verify(token,config.JWT_SECRET_KEY!)
        const user = await User.findOne({email})
        if(!user)throw new Error('Invalid token')
       res.locals.user = user
       return next()
          }
          catch(err){
        return res.status(401).json({error: "not authorized"})
          }
}   
