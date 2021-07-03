import express,{Request,Response} from 'express';
import  User  from '../models/User';
import { isEmpty, validate } from 'class-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../services/config";
import authentication from"../services/authentication"
import {mapErrors} from "../helpers/mapErrors"

const router = express.Router();
router.get('/',  (_: Request, res: Response) => {
    res.send("user")
})
router.post('/register',[], async (req: Request, res: Response)=>{
    const { email, username, password } = req.body

  try {
    // Validate data
    let errors: any = {}
    const emailUser = await User.findOne({ email })
    const usernameUser = await User.findOne({ username })

    if (emailUser) errors.email = 'Email is already taken'
    if (usernameUser) errors.username = 'Username is already taken'

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }

    // Create the user
    const user = new User({ email, username, password })

    errors = await validate(user)
    if (errors.length > 0) return res.status(400).json(mapErrors(errors))

    await user.save()

    // Return the user
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.post('/login',[], async (req: Request, res: Response)=>{
  const { email ,password } = req.body
  try{
    let errors:any ={}
    if(isEmpty(email)) errors.email ='Email should not be empty'
    if(isEmpty(password)) errors.password ='Password should not be empty'
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors)
    }
const user = await User.findOne({email})
// const user = await User.findOne({ username })

if(!user) return res.status(404).json({error: 'This user does not exist'})
const passwordMatches = await bcrypt.compare(password,user.password)
if(!passwordMatches) return res.status(401).json({error: 'incorrect credentials '})
const token = jwt.sign({email},config.JWT_SECRET_KEY!)
res.cookie('token', token,{httpOnly:true,secure: config.NODE_ENV === 'production',sameSite:'strict',maxAge:40000000,path:"/"})
return res.json(user)
  }catch(err){
return res.status(500).json({ error:"something went wrong"})
  }
})
router.get('/profile',authentication, async (_: Request, res: Response)=>{
return res.json(res.locals.user)
}
)
router.get('/logout',authentication, async (_: Request, res: Response)=>{
res.clearCookie("token")
return res.json({success:"logged out"})
}
)

export {router as user}