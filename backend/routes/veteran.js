import express from 'express';

import Veteran from '../models/Veteran.js';
import Post from '../models/Post.js';
import {isAuthenticated} from './../middlewares/auth.js';


const router = express.Router();

router.post("/register", async (req, res)=>{
    try{
        const {name, email, password, type, stars, hobby, image} = req.body;
    
        let user = await Veteran.findOne({email});
        if(user)
            return res.status(400).json({success: false, message: "Veteran Already Exist"});

        var category = "";
        if(type === "Organization") category = "Organization"
        else if(stars < 25000)   category = "Silver Veteran"
        else if(stars < 40000)   category = "Ruby Veteran"
        else if(stars < 50000)   category = "Golden Veteran"
        else if(stars < 60000)   category = "Diamond Veteran"
        else if(stars < 65000)   category = "Sapphire Veteran"
        else if(stars < 70000)   category = "Platinum Veteran"
        else if(stars >= 70000)   category = "Eternal Sage"
        
        user = await Veteran.create({name, email, password, image, type, stars, category, hobby})

        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token
        });

    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await Veteran.findOne({email}).select("+password");

        if(!user)
            return res.status(400).json({success: false, message: "Veteran Does Not Exist"});

        const isMatch = await user.matchPassword(password);
        if(!isMatch)
            return res.status(400).json({success: false, message: "Incorrect Password"});

        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token
        });

    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }

});

router.get("/logout", async (req, res) => {
    try{
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        res.status(201).cookie("token", null, options).json({success: true, message: "Logged Out"});

    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }
})

router.get("/follow/:meId/:id",  async (req, res)=>{
    try{
        const user = await Veteran.findById(req.params.id);
        const me = await Veteran.findById(req.params.meId);

        if(!user)
            return res.status(400).json({success: false, message: "Veteran Not Found"});
        
        if(me.followings.includes(user._id)){
            const index1 = me.followings.indexOf(user._id);
            me.followings.splice(index1, 1);

            const index2 = user.followers.indexOf(me._id);
            user.followers.splice(index2, 1);

            await me.save();
            await user.save();

            return res.status(200).json({success: true, message: "Veteran Unfollowed"});
        }

        me.followings.push(user._id);
        user.followers.push(me._id);

        await me.save();
        await user.save();

        res.status(200).json({success: true, message: "Veteran Followed"});

    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }
})

router.put("/updatePassword", isAuthenticated, async (req, res) => {
    try{
        const user = await Veteran.findById(req.user._id).select("+password");
        const {oldP, newP} = req.body;

        if(!oldP || !newP)
            return res.status(400).json({success: false, message: "Fields are empty"});

        const isMatch = await user.matchPassword(oldP);
        if(!isMatch)
            return res.status(201).json({success: false, message: "Incorrect Old Password"});

        user.password = newP;
        await user.save();

        res.status(201).json({success: true, message: "Password Updated"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.put("/updateProfile", isAuthenticated, async (req, res) => {
    try{
        const user = await Veteran.findById(req.user._id);
        const {name, email} = req.body;

        if(name) user.name = name;
        if(email) user.email = email;
        user.save();

        res.status(201).json({success: true, message: "Profile Updated"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.delete("/delete", isAuthenticated, async (req, res)=>{
    try{
        const user = await Veteran.findById(req.user._id);
        
        for(let i=0 ; i<user.posts.length ; i++){
            const post = await Post.findById(user.posts[i]);
            await post.remove();    
        }

                // Follower's Following
        for(let i=0 ; i<user.followers.length ; i++){
            const follower = await Veteran.findById(user.followers[i]);
            const index = follower.followings.indexOf(req.user._id);
            follower.followings.splice(index, 1);
            await follower.save();
        }
                // Following's Follower
        for(let i=0 ; i<user.followings.length ; i++){
            const following = await Veteran.findById(user.followings[i]);
            const index = following.followers.indexOf(req.user._id);
            following.followers.splice(index, 1);
            await following.save();
        }

        await user.remove();
         
                //LOGGING OUT
        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }
        res.status(201).cookie("token", null, options).json({success: true, message: "Deleted and Logged Out"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.get("/myProfile", isAuthenticated, async (req, res) => {
    try{
        const user = await Veteran.findById(req.user._id).populate("posts");
        res.status(201).json({success: true, user});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.get("/veteranProfile/:id", isAuthenticated, async (req, res) => {
    try{
        const user = await Veteran.findById(req.params.id).populate("posts");
        if(!user)
            return res.status(400).json({success: false, message: "Veteran Not Found"});

        res.status(201).json({success: true, user});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.get("/allVeteran",  async (req, res) => {
    try{
        const user = await Veteran.find({});

        res.status(201).json({success: true, user});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

export default router;