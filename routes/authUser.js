import express from 'express'
import {User} from '../models/users.js'
const router = express.Router()

router.post  ('/', async (req,res) =>{
     const newUser =  {
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
     }

     try {
         const user = await User.create(newUser);
         return res.status(200).send("user account created")
     } catch (error) {
        console.log(error)
     }
})

export default router