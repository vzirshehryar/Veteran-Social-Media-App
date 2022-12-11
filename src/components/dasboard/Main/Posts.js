import React, { useState } from 'react'
// import { useSelector } from 'react-redux';

import './posts.css'

function Posts(props) {
  // const me = useSelector((state) => state.userId);
  const [like, setLike] = useState(false);
  const [likeS, setLikeS] = useState({backgroundColor: "red"})

  const liked = () =>{
    // const data =fetch(`http://localhost:4000/veteran/follow/${me._id}/${props.ownerId}`)
    // .then(res => res.json())
    // .then(data => data)
    // .catch(err => console.log(err));
    // if(data){
      if(!like){
        setLikeS({backgroundColor: "blue"})
        setLike(true)
        console.log(like);
      }
      else{
        setLikeS({backgroundColor: "red"})
        setLike(false)
        console.log(like);
      }
    // }
  }

  return (
    <div id="post1">
      <div>
        <div>
          <img src={props.ownerImage} alt='shery'/>
          <h5><b>{props.ownerName}</b></h5>
        </div>
        <button onClick={liked} style={likeS}>Like</button>
      </div>
      <div id='post2'>
        <img src={props.postImage} alt='shery'/>
      </div>
      <div className='caption'>
        <p>{props.postCaption}</p>
      </div>
    </div>
  )
}

export default Posts