import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function PostEvent() {
    const me = useSelector((state) => state.userId);
    const [content, setContent] = useState("");
    const [type, setType] = useState("Public Talks");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [stars, setStars] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!content || !location || !city || !city || !stars || stars<5000)
            return setError(true);
        setError(false);
        
        const obj = {content, city, location, type, owner: me.name, stars}

        fetch("http://localhost:4000/veteran/event/upload", 
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=> res.json())
            .then((data)=> {
                if(data.success === false){
                    console.log(data.message);
                    return;
                }
                setContent("");
                setLocation("");
                setCity("");
                setStars("");
                console.log(data);
            })
            .catch((err)=> console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Content of Event' value={content} onChange={(e)=>setContent(e.target.value)}/>
            <input placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)}/>
            <input placeholder='Location' value={location} onChange={(e)=>setLocation(e.target.value)}/>
            <input placeholder='Stars' value={stars} onChange={(e)=>setStars(e.target.value)}/>
            <div>
                <span>Event Type: </span>
                <select id="hobby" defaultValue={"Public Talks"} onChange={(e)=>setType(e.target.value)}>
                    <option value="Public Talks">Public Talks</option>
                    <option value="Motivational Talks">Motivational Talks</option>
                    <option value="Professional Talks">Professional Talks</option>
                    <option value="Professional Tasks">Professional Tasks</option>
                    <option value="Plantation Drives">Plantation Drives</option>
                    <option value="Orphanage Visits">Orphanage Visits</option>
                    <option value="Visiting Patitents into Hospitals">Visiting Patitents into Hospitals</option>
                    <option value="Recreational Visit">Recreational Visit</option>
                    <option value="Old Home Visit">Old Home Visit</option>
                    <option value="Book Reading/Discussion">Book Reading/Discussion</option>
                </select>
            </div>
            <input style={{border: error ? "1px solid red" : "1px solid black"}} type={"submit"} value="POST"/>
        </form>
  )
}

export default PostEvent
