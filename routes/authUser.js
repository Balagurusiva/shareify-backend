import express from 'express'
import { User } from '../models/users.js'
import bcrypt from 'bcrypt'
const router = express.Router()

 
router.post('/', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        }
        const existingUser = await User.findOne({ "email": req.body.email })

        if (existingUser) return res.status(403).send("user already exits with this email id")

        const user = await User.create(newUser);
        return res.status(200).send("user account created")
    } catch (error) {
        console.log(error)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).lean()
        if (!user) return res.status(404).send("user not found")

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        !isCorrectPassword && res.status(400).json({ "error": "invalid password" })


        if (user && isCorrectPassword) return res.status(200).json({"msg":"user logged successfullu", "data":user})

    } catch (error) {
        console.log(error)
    }
})


export default router

