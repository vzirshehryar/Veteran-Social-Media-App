import React from 'react'
import { Link } from 'react-router-dom'

import './login.css'
import LoginForm from './LoginForm'


export default function Login() {
  return (
    <main className='body'>
        <div className='form'>
            <h1>Login Now</h1>
            <LoginForm/>
            <Link to="/register"><h4>Go to Register Page</h4></Link>
        </div>
    </main>
  )
}
