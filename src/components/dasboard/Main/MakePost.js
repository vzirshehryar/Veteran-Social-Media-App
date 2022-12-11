import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import FileBase64 from 'react-file-base64';

function MakePost() {
  const me = useSelector((state) => state.userId);
  const [text, setText] = useState()
  const [done, setDone] = useState(false)
  const [url, setUrl] = useState({});

  const handlePost = async () => {
    if(!text)
      return;
      try{
        const options = {
            method: "POST",
            body: JSON.stringify({caption: text, imageUrl: url}),
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
        setDone(false);
    }
    catch(error){
        console.log(error);
    }
  }

  const handleImage = (base64)=>{
    setUrl(base64.base64);
    setDone(true);
  }
  return (
    <>
      <div className='text-container'><textarea type={text} value={text} onChange={(e)=>setText(e.target.value)} className='inpuPost' name='post' rows={2}/></div>
      {done && <img className='img' src={url} alt='shery'/>}
      <div className='icon-container'>
        <div>
          <FileBase64 className="hide" multiple={false} onDone={(base64)=>handleImage(base64)}/>
        </div>
        <button onClick={handlePost}>Post</button>
      </div>
    </>
  )
}

export default MakePost