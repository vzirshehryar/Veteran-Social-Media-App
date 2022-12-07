import React, {useState} from 'react'
import { useSelector } from 'react-redux'

function MakePost() {
  const me = useSelector((state) => state.userId);
  const [text, setText] = useState()

  const handlePost = async () => {
    if(!text)
      return;
      try{
        const options = {
            method: "POST",
            body: JSON.stringify({caption: text}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const res = await fetch(`http://localhost:4000/veteran/post/upload/${me._id}`, options);
        const data = await res.json();
        if(data.success === false){
            setText(data.message);
            return;
        }
        setText("");
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <>
      <div className='text-container'><textarea type={text} value={text} onChange={(e)=>setText(e.target.value)} className='inpuPost' name='post' rows={2}/></div>
      <div className='icon-container'>
        <div>
          <i>Image</i>
          <i>Video</i>
        </div>
        <button onClick={handlePost}>Post</button>
      </div>
    </>
  )
}

export default MakePost