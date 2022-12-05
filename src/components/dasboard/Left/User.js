import React from 'react'
import { Link } from 'react-router-dom'

function User(props) {
  return (
    <Link to={`/user/${props.userId}`} className="link">
        <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-spot-a-fake-online-review-1661334852.jpg?resize=980:*' alt='shery'/>
        <p>{props.name}</p>  
    </Link>
  )
}

export default User
