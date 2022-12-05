import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {getUserId} from '../../Actions/Veteran'

export default function RegisterForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stars, setStars] = useState(0);
    const [type, setType] = useState("Veteran");
    const [error, setError] = useState("");

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(!userName || !email || !password || !stars)
            return setError("All fields are required");

        const obj = {
            "name": userName,
            "email": email,
            "password": password,
            // "stars": stars,
            // "type": type
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
                console.log(data);
                dispatch(getUserId(data.user))
                navigate("/")
            })
            .catch((err)=> console.log(err));
    } 

    return (
    <form onSubmit={handleSubmit}>
        <input type="userName" name="userName" placeholder="User Name"value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <input type="email" name="email" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
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
        <input type="password" name="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="submit" value={"Register"} className="button"/>
        <p style={{color: "red", height: "20px"}}>{error}</p>
    </form>
    )
}
