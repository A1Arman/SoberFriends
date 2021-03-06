import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import icon from '../../images/favicon.ico';
import './AppNav.css';

function AppNav(props) {
    return (
        <>
        <Menu role='navigation'>
            <Link to='/' id='app-icon'>SoberFriends</Link> 
            <Link to='/dashboard' className='menu-item'>Home</Link>
            <Link to='/addPost' className='menu-item'>Create a Post</Link>
            <Link to='/profile' className='menu-item'>Profile</Link>
            <Link to='/posts' className='menu-item'>Posts</Link>
            <Link to='/' className='menu-item' onClick={props.handleLogout}>Log Out</Link>
        </Menu>
        </>
    )
}

export default AppNav;