import React from 'react'

function MakePost() {
  return (
    <>
      <div className='text-container'><textarea className='inpuPost' name='post' rows={2}/></div>
      <div className='icon-container'>
        <div>
          <i>Image</i>
          <i>Video</i>
        </div>
        <button>Post</button>
      </div>
    </>
  )
}

export default MakePost