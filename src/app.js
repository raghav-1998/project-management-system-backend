import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express()


//Express Configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))

//CORS Configuration
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use(cookieParser())
// app.get('/',(req,res)=>{
//     res.send("Hello Backend in Javascript")
// })

// app.post('/',(req,res)=>{
//     res.send("Sending a Post Request")
// })

// app.get('/gmail',(req,res)=>{
//     res.send("Redirecting to Gmail Page")
// })

import healthCheckRouter from './routes/healthCheck.routes.js';
import userRouter from './routes/user.routes.js'

app.use('/api/v1/healthCheck', healthCheckRouter);
app.use('/api/v1/user',userRouter)

export default app;