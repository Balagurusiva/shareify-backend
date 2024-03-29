import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"
import cors from 'cors'

import userRoutes from './routes/users.js'
import authRouter from './routes/authUser.js'
import postRouter from './routes/posts.js'

dotenv.config()
const app = express()

//middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan("common"))

//routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRoutes)
app.use('/api/posts', postRouter)
 
 

//DB connection and server creation
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected")
        app.listen(process.env.PORT, console.log("listen at ", process.env.PORT))
    })
    .catch((error) => console.log(error))
