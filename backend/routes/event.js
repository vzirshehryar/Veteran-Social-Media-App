import express from 'express';

import Veteran from '../models/Veteran.js';
import Event from '../models/Event.js';

const router = express.Router();

router.post("/event/upload", async (req, res)=>{
    const {content, owner, location, city, type, stars} = req.body;
    try{
        const newPostEvent = {content, owner, location, city, type, stars};

        const newEvent = await Event.create(newPostEvent);

        res.status(201).json({success: true, post: newEvent});
        
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.get("/getEvents", async (req, res)=>{
    try{
        const newEvent = await Event.find();
        if(!newEvent)
            return res.status(404).json({success: false, message: "no events to show"});

        res.status(201).json({success: true, events: newEvent});

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.post("/interested/:me/:id", async (req, res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event)
            return res.status(404).json({success: false, message: "no events found"});

        if(event.interested.includes(req.params.me)){
            const index = event.interested.indexOf(req.params.me);
            event.interested.splice(index, 1);
            await event.save();
            return res.status(200).json({success: true, message: "Event Uninterested"});
        }
        else{
            event.interested.push(req.params.me);
            await event.save();
            return res.status(200).json({success: true, message: "Event Interested"});
        }


    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

router.post("/attended/:me/:id", async (req, res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event)
            return res.status(404).json({success: false, message: "no events found"});

        if(event.attended.includes(req.params.me)){
            const index = event.attended.indexOf(req.params.me);
            event.attended.splice(index, 1);
            await event.save();

            const user = await Veteran.findById(req.params.me);
            user.stars = user.stars - event.stars;
            await user.save();

            return res.status(200).json({success: true, message: "Event UnAttended"});
        }
        else{
            event.attended.push(req.params.me);
            await event.save();

            const user = await Veteran.findById(req.params.me);
            user.stars = user.stars + event.stars;
            await user.save();

            return res.status(200).json({success: true, message: "Event Attended"});
        }


    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
})

export default router;