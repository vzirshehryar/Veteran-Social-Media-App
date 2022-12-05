import React from 'react'

import './register.css'
import RegisterForm from './RegisterForm'

export default function Register() {
  return (
    <div>
      <main className='body'>
        <div className='form'>
            <h1>Register Now</h1>
            <RegisterForm/>
        </div>
    </main>
    </div>
  )
}
