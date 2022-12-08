import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import './events.css'
import PostEvent from './PostEvent';

const OneEvent = ({event}) =>{
    const me = useSelector((state) => state.userId);
    const [interest, setInterest] = useState(false);
    const [attend, setAttend] = useState(false);

    useState(()=>{

    }, [interest, attend])

    const interested = () =>{
        if(interest)
            setInterest(false);
        else
            setInterest(true);
        
        const url = `http://localhost:4000/veteran/interested/${me._id}/${event._id}`;
        fetch(url, {method: "post"})
        .then((response) => response.json())
        .then((json) => json.events)
        .catch((error) => console.log(error));
        
    }
    const attended = () =>{
        if(attend)
            setAttend(false);
        else
            setAttend(true);

        const url = `http://localhost:4000/veteran/attended/${me._id}/${event._id}`;
        fetch(url, {method: "post"})
        .then((response) => response.json())
        .then((json) => json.events)
        .catch((error) => console.log(error));
        
    }
        
        return (
            <div className='events'>
            <div className='by'> By : {event.owner}</div>
            <div className='content'>
                <div>{event.content}</div>
                <div>
                    <div>Event Type: {event.type}</div>
                    <div>City: {event.city}</div>
                    <div>Location: {event.location}</div>
                </div>    
            </div>
            <div className='btns'>
                <button onClick={interested}>{!interest ? "Interest" : "Interested"}</button>
                <button onClick={attended}>{!attend ? "Attend" : "Attended"}</button>
            </div>
        </div>
    )
}

function Events() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
    const url = `http://localhost:4000/veteran/getEvents`;
    fetch(url)
        .then((response) => response.json())
        .then((json) => setData(json.events))
        .catch((error) => console.log(error));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
    if (data.length !== 0) {
        setIsLoading(false);
    }
    console.log(data);
    }, [data]);
    
    return (
    <div className='event'>
        <div className='makeEvent'>
            <PostEvent />
        </div>
        <div className='oneEvent'>
            {isLoading ? (
            <h1>Loading...</h1>
            ) : (
            data.map((event) => (
                <OneEvent
                key={event._id}
                event={event}
                />
            ))
            )}
        </div>
    </div>
    )
}

export default Events
