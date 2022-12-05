import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import './dashboard.css'
import Left from './Left/Left';
import Main from './Main/Main';

function Dashboard() {
	const myId = useSelector((state) => state.userId);
	const navigate = useNavigate();

	useEffect(()=>{
		if(!myId){
			console.log("khali ha")
			// navigate("/login");
		}
	})

  return (
    <main>
        <div className='left'>
            <Left/>
        </div>
        <div className='main'>
            <Main/>
        </div>
    </main>
  )
}

export default Dashboard
