import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {getUserId} from './../../Actions/Veteran'


export default function LoginForm() {

    const dispatch  = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // console.log("rendered");

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(!email || !password)
            return setError("All fields are required");

        try{
            const options = {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
            const res = await fetch("http://localhost:4000/veteran/login", options);
            const data = await res.json();
            if(data.success === false){
                setError(data.message);
                return;
            }
            setError("");
            setEmail("");
            setPassword("");
            dispatch(getUserId(data.user))
            navigate("/");
            
        }
        catch(error){
            console.log(error);
        }
        
    } 

    return (
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" name="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="submit" value={"Login"} className="button"/>
        <p style={{color: "red", height: "20px"}}>{error}</p>
    </form>
    )
}
