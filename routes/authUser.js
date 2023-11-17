import express from 'express'
import {User} from '../models/users.js'
import bcrypt from 'bcrypt'
const router = express.Router()


router.post  ('/', async (req,res) =>{
      
     try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser =  {
        userName : req.body.userName,
        email : req.body.email,
        password :  hashedPassword
     }
        const existingUser = await User.findOne({"name":req.body.name})
        if(existingUser) return res.status(403).send("user already exits try anothe user name")
        
        const user = await User.create(newUser);
        return res.status(200).send("user account created")
     } catch (error) {
        console.log(error)
     }
})

export default router