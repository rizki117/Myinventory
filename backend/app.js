





import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRouter from "./routers/userRouter.js"
import produkRouter from "./routers/produkRouter.js"
import AuthRouter from "./routers/AuthRouter.js"
import publicRouter from "./routers/publicRouter.js"


dotenv.config();

const app=express();


app.use(cors({
 credentials:true,
 origin:'http://localhost:5173'
}));



app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(produkRouter);
app.use(AuthRouter);
app.use(publicRouter);
app.listen(process.env.PORT, ()=>{
 console.log(`Server running ,${process.env.PORT}`)
});




