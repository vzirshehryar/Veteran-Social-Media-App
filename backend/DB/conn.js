import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;
// console.log(DB);
mongoose.connect(DB).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error);
})