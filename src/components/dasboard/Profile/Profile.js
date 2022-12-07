import React, { useState } from 'react'
import {useSearchParams} from 'react-router-dom'

import './profile.css'
import Posts from './../Main/Posts'

function Profile(props) {
	const [req, setReq] = useState("Follow");
	const [params] = useSearchParams();
	console.log(params.url);

  return (
		<>
			<div className='profile-1'>
				<img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-spot-a-fake-online-review-1661334852.jpg?resize=980:*' alt='shery'/>
				<div>
					<h3>{"Wazir Shehryar"}</h3>
					<p>{"Veteran"}</p>
					<button onClick={()=> (req==="Follow")?setReq("Following"):setReq("Follow")}>{req}</button>
				</div>
			</div>
			<div className='post2'>
				<div>
					<img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-spot-a-fake-online-review-1661334852.jpg?resize=980:*' alt='shery'/>
					<p>caption</p>	
				</div>	
			</div>
		</>
  )
}

export default Profile
