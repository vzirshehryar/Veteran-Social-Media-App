import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function PostEvent() {
    const me = useSelector((state) => state.userId);
    const [content, setContent] = useState("");
    const [type, setType] = useState("Sports");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!content || !location || !city || !city)
            return;
        const obj = {content, city, location, type, owner: me.name}

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
                console.log(data);
            })
            .catch((err)=> console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Content of Event' value={content} onChange={(e)=>setContent(e.target.value)}/>
            <input placeholder='City' value={city} onChange={(e)=>setCity(e.target.value)}/>
            <input placeholder='Location' value={location} onChange={(e)=>setLocation(e.target.value)}/>
            <div>
                <span>Event Type: </span>
                <select id="hobby" defaultValue={"Sports"} onChange={(e)=>setType(e.target.value)}>
                    <option value="Sports">Sports</option>
                    <option value="Book Reading">Book Reading</option>
                    <option value="Drawing">Drawing</option>
                    <option value="Charity">Charity</option>
                    <option value="Plantation">Plantation</option>
                    <option value="Public Talk">Public Talk</option>
                </select>
            </div>
            <input type={"submit"} value="POST"/>
        </form>
  )
}

export default PostEvent
