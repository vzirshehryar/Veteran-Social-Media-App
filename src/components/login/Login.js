import React from 'react'

import './login.css'
import LoginForm from './LoginForm'


export default function Login() {
  return (
    <main className='body'>
        <div className='form'>
            <h1>Login Now</h1>
            <LoginForm/>
        </div>
    </main>
  )
}
