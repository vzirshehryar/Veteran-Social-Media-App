import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './main.css'
import MakePost from './MakePost'
import Posts from './Posts'

function Main() {
  const me = useSelector((state) => state.userId);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://localhost:4000/veteran/posts/${me._id}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.posts))
      .catch((error) => console.log(error));

      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
    console.log(data);
  }, [data]);

  return (
    <div id='center'>
      {/* <h1>{posts[0].caption}</h1> */}
			<div className='makePost'><MakePost/></div>
			<div className='post'>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          data.map((post) => (
            <Posts
             key={post._id}
             postId={post._id}
             postImage={post.imageUrl}
             postCaption={post.caption}
             likes={post.likes}
             comments={post.comments}
             ownerId={post.owner._id}
             ownerName={post.owner.name}
             ownerImage={post.owner.image}
             />
          ))
        )}        
      </div>
      
    </div>
  )
}

export default Main
