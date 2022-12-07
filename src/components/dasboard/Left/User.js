import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function User(props) {
  const me = useSelector((state) => state.userId);
  var status = false;

  for(let i=0 ; i<me.followings.length ; i++){
    if(me.followings[i].toString() === props.data._id.toString()){
      console.log(me.followings[i]);
      console.log(props.data._id);
      status = true;
      break;
    }
  } 

  const follow = () => {
    const data =fetch(`http://localhost:4000/veteran/follow/${me._id}/${props.data._id}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err));
    if(data){
      
    }
  }

  return (
    // <Link to={`/veteran/${props.userId}`} className="link">
      <div className="link">
        <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-spot-a-fake-online-review-1661334852.jpg?resize=980:*' alt='shery'/>
        <div>
          <p>{props.data.name}</p>
          <p className='type'>{props.data.category}</p>
        </div>  
        {(status) ? <button onClick={follow}>{"Following"}</button> : <button onClick={follow}>{"Follow"}</button>}
      </div> 
    // </Link> 
  )
}

export default User
