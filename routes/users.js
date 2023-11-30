import express from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/users.js'
const router = express.Router()

//update user details 

router.put('/:id', async(req,res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password= bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(err)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.param.id,{
                $set:req.body
            })
            res.status(200).json("Account updated ")
        }  catch(err){
                 return res.json(err)
        }
    }else{
        return res.status(403).json("you can only update your account")
    }
})
export default router