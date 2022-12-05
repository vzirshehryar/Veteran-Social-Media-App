import React from 'react'
import LeftTop from './LeftTop'
import LeftBottom from './LeftBottom'

function Left() {
  return (
    <>
        <div className='part'><LeftTop/></div>

        <div className='part'><LeftBottom/></div>
    </>
  )
}

export default Left