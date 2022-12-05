import jwt from 'jsonwebtoken';

import Veteran from "../models/Veteran.js";

const isAuthenticated = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({message: "Please Login First"});
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Veteran.findById(decode._id);

        next();
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export {isAuthenticated};