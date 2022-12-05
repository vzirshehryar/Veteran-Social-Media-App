import express from 'express';

import Veteran from '../models/Veteran.js';

const authentication = express.Router();

authentication.post("/register", (req, res)=>{
    const r = req.body;
    Veteran.findOne({email: r.email}, (err, data)=>{
        if(err)
            return res.json({error: "an error occured"});
        if(data)
            return res.json({error: "email already exist"}); 
        
        const veteran = new Veteran(r);
        veteran.save((e, d)=>{
            if(!e) return res.json(d);
        });
    })

});

authentication.post("/login", (req, res)=>{
    const r = req.body;
    Veteran.findOne({email: r.email, password: r.password}, (err, data)=>{
        if(err)
            return res.json({error: "an error occured"});
        if(data)
            return res.json(data); 
            
        return res.json({error: "email or password not correct"});
    })

});



export default authentication;