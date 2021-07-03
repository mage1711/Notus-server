  
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if (!token) {
        res.locals.user = undefined
        return next()
    } 

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!)

    const user = await User.findOne({ username })

    res.locals.user = user

    return next()
  } catch (err) {
    console.log(err)
    res.locals.user = undefined
    return next()
  }
}