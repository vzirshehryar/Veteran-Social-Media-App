import express, { application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import * as dotenv from 'dotenv';
dotenv.config();

import './DB/conn.js'

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: "30mb"}));
app.use(bodyParser.urlencoded({limit: "30mb" ,extended: true }));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("hellllllo");
})

import authentication from './routes/authentication.js';
import post from './routes/post.js';
import veteran from './routes/veteran.js';
import event from './routes/event.js'

// app.use("/veteran", authentication);

app.use("/veteran", post);
app.use("/veteran", veteran);
app.use("/veteran", event);

app.listen(PORT || 4000, ()=>{
    console.log(`listening at port ${PORT || 4000}`)
})