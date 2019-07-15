import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './AppNav.css';

function AppNav(props) {
    return (
        <>
        <Menu role='navigation'> 
            <Link to='/posts' className='menu-item'>Home</Link>
            <Link to='/addPost' className='menu-item'>Create a Post</Link>
            <Link to='/profile' className='menu-item'>Profile</Link>
            <Link to='/' onClick={props.handleLogout}>Log Out</Link>
        </Menu>
        </>
    )
}

export default AppNav;