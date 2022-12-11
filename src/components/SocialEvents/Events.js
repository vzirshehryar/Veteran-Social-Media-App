import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';

import './events.css'
import PostEvent from './PostEvent';

const OneEvent = ({event}) =>{
    const me = useSelector((state) => state.userId);
    const [interest, setInterest] = useState(false);
    const [attend, setAttend] = useState(false);

    // console.log(event.type);
    // console.log(me.hobby);

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
    const me = useSelector((state) => state.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [post, setPost] = useState(false);
    const [search, setSearch] = useState(false);

    const find = useRef();

    const getAllData = async ()=>{
        const url = `http://localhost:4000/veteran/getEvents`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json.events))
            .catch((error) => console.log(error));
    }
    
    useEffect(() => {
        getAllData()
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
    if (data.length !== 0) {
        setIsLoading(false);
    }
    // console.log(data);
    }, [data]);
    
    const close = () =>{
        post ? setPost(false) : setPost(true);
    }
    const closeSearch = () =>{
        search ? setSearch(false) : setSearch(true);
    }

    const searchByLocation = ()=>{
        const location = find.current.value
        getAllData();
        if(!location) return;

        const newData = data.filter((ev)=>{
            if(ev.location === location){
                console.log(ev.location);
                return true;
            }
            return false
        })

        setData(newData);
        console.log(data);

    }
    const searchByCity = ()=>{
        const city = find.current.value
        getAllData();
        if(!city) return 
        
        const newData = data.filter((ev)=>{
            console.log(ev.city);
            if(ev.city === city)
                return true;
            return false
        })

        console.log(newData);
        setData(newData);
        
    }
    
    return (
    <div className='event'>
        <div className='makeEvent'>
            <button onClick={close}>Let's make an Event</button>
            {
                post &&
                <PostEvent />
            }
        </div>
        <div className='makeSearch'>
            <button onClick={closeSearch}>Let's Search</button>
            {
                search &&
                <div>
                    <input ref={find}/>
                    <div>
                        <button onClick={searchByLocation}>By Location</button>
                        <button onClick={searchByCity}>By City</button>
                    </div>
                </div>
            }
        </div>
        <div className='oneEvent'>
            {isLoading ? (
            <h1>Loading...</h1>
            ) : (
            data.map((event) =>
                (event.type === me.hobby || event.owner === me.name) &&
                <OneEvent
                key={event._id}
                event={event}
                />
            )
            )}
        </div>
    </div>
    )
}

export default Events
