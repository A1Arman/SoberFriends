import React from 'react';
import { Link } from 'react-router-dom';
import './AppNav.css';

function AppNav() {
    return (
        <nav role="navigation">
            <h3>SoberFriends</h3>
            <ul>
                <li><Link to='/posts'>Home</Link></li>
                <li><Link to='/addPost'>Create a Post</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
            </ul>
        </nav>
    )
}

export default AppNav;