import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"

import userRoutes from './routes/users.js'
import router from './routes/authUser.js'

dotenv.config()
const app = express()

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

//routes
app.use('/api/user', userRoutes)
app.use('/api/auth', router)
app.use('/api', router)




//DB connection and server creation
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB connected")
        app.listen(process.env.PORT, console.log("listen at ", process.env.PORT))
    })
    .catch((error) => console.log(error))
