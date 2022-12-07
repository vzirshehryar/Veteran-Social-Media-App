import express from 'express';

import Post from './../models/Post.js'
import Veteran from '../models/Veteran.js';
import {isAuthenticated} from './../middlewares/auth.js';


const router = express.Router();

router.post("/post/upload/:me", async (req, res)=>{
    try{
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body.public_id",
                url: "req.body.url"
            },
            owner: req.params.me
        }

        const newPost = await Post.create(newPostData);

        const user = await Veteran.findById(req.params.me);
        user.posts.push(newPost._id);
        await user.save();


        res.status(201).json({success: true, post: newPost});

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.get("/post/:me/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        // console.log(post._id);
        if(!post)
            return res.status(404).json({success: false, message: "Post Not Found"});
        
        if(post.likes.includes(req.params.me)){
            const index = post.likes.indexOf(req.params.me);
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({success: true, message: "Post Unliked"});
        }
        else{
            post.likes.push(req.params.me);
            await post.save();
            return res.status(200).json({success: true, message: "Post liked"});
        }
        
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.delete("/post/:id", isAuthenticated, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        // console.log("post._id");
        if(!post)
            return res.status(404).json({success: false, message: "Post Not Found"});
        
        if(post.owner.toString() !== req.user._id.toString())
            return res.status(401).json({success: false, message: "Unauthorized"});
        
        await post.remove();
        
        const user = await Veteran.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();

        res.status(200).json({success: true, message: "Post Deleted"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
});

router.get("/posts/:id", async (req, res)=>{  // this is changed
    try{
        const user = await Veteran.findById(req.params.id);

        const posts = await Post.find({
            owner: {
                $in: user.followings
            }
        }).populate("owner likes comments.user")

        res.status(200).json({success: true, posts: posts.reverse()});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

export default router;