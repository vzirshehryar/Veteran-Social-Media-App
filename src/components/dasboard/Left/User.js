import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'

function User(props) {
  const me = useSelector((state) => state.userId);
  const [status, setStatus] = useState(false);

  useEffect(()=>{
    if(me.followings.includes(props.data._id))
      setStatus(true);
    else
      setStatus(false);
      // eslint-disable-next-line
  }, [])

  const follow = async () => {
    try{
      if(me._id === props.data._id)
        if(status === true)
          return console.log("its you idiot")

      const res = await fetch(`http://localhost:4000/veteran/follow/${me._id}/${props.data._id}`);
      const data = await res.json()
      if(data){
        console.log(data);
        if(!status)
          setStatus(true);
        else
          setStatus(false);
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    // <Link to={`/veteran/${props.userId}`} className="link">
      <div className="link">
        <img src={props.data.image} alt='shery'/>
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
