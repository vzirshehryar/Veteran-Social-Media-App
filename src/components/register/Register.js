import React from 'react'
import { Link } from 'react-router-dom'

import './register.css'
import RegisterForm from './RegisterForm'

export default function Register() {
  return (
    <div>
      <main className='body'>
        <div className='form'>
            <h1>Register Now</h1>
            <RegisterForm/>
            <Link to="/login"><h4>Go to Login Page</h4></Link>
        </div>
    </main>
    </div>
  )
}
