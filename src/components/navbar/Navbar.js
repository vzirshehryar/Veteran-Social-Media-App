import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.css'

export default function Navbar() {

    return (
        <nav>
            <ul>
                <li className='logo'>
                    <Link to="/">VETERAN APP</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
                <li>
                    <Link to="/login">Logout</Link>
                </li>
            </ul>
        </nav>
    )
}
