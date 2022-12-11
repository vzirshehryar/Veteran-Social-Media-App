import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {getUserId} from '../../Actions/Veteran'
import FileBase64 from 'react-file-base64';

export default function RegisterForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stars, setStars] = useState(0);
    const [image, setImage] = useState("");
    const [type, setType] = useState("Veteran");
    const [hobby, setHobby] = useState("Public Talks");
    const [error, setError] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(!userName || !email || !password || !stars || !image)
            return setError("All fields are required");

        const obj = {
            "name": userName,
            "email": email,
            "password": password,
            "stars": stars,
            "type": type,
            "hobby": hobby,
            "image": image
        }

        fetch("http://localhost:4000/veteran/register", 
            {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=> res.json())
            .then((data)=> {
                if(data.success === false){
                    setError(data.message);
                    return;
                }
                setError("");
                setUserName("");
                setEmail("");
                setPassword("");
                setImage("");
                console.log(data);
                dispatch(getUserId(data.user))
                navigate("/")
            })
            .catch((err)=> console.log(err));
    } 

    return (
    <form onSubmit={handleSubmit}>
        <FileBase64 multiple={false} onDone={(base64)=>setImage(base64.base64)}/>
        <input type="userName" name="userName" placeholder="User Name"value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <input type="email" name="email" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="number" name="number" placeholder="Stars" value={stars} onChange={(e)=>setStars(e.target.value)}/>
        <div className='radio'>
            <div>
                <input type="radio" id="html" name="type" value="Veteran" defaultChecked onClick={(e)=>setType(e.target.value)}/>
                <label htmlFor="html">Veteran</label><br/>
            </div>
            <div>
                <input type="radio" id="css" name="type" value="Organization" onClick={(e)=>setType(e.target.value)}/>
                <label htmlFor="css">Organization</label><br/>
            </div>
        </div>
        <div>
            <span>Your Hobby: </span>
            <select id="hobby" defaultValue={"Public Talks"} onChange={(e)=>setHobby(e.target.value)}>
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
        <input type="submit" value={"Register"} className="button"/>
        <p style={{color: "red", height: "20px", margin: "0px"}}>{error}</p>
    </form>
    )
}
