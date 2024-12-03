import bodyParser from "body-parser";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./utils/db.js";


const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

import userRoutes from "./routes/user.route.js"

app.use("/api/user", userRoutes)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
    connectDB()
})