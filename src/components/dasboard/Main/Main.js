import React from 'react'

import './main.css'
import MakePost from './MakePost'
import Posts from './Posts'

function Main() {
  return (
    <div id='center'>
			<div className='makePost'><MakePost/></div>
			<div className='post'><Posts/></div>
    </div>
  )
}

export default Main
