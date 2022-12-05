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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("hellllllo");
})

import authentication from './routes/authentication.js';
import post from './routes/post.js';
import veteran from './routes/veteran.js';

// app.use("/veteran", authentication);

app.use("/veteran", post);
app.use("/veteran", veteran);

app.listen(PORT || 4000, ()=>{
    console.log(`listening at port ${PORT || 4000}`)
})