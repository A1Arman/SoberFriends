import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './LandingNav.css';

function LandingNav(props) {
    return (
        <nav className='nav' role="navigation">
            <ul>
                <li className='title'><Link to='/'>SoberFriends</Link></li>
                <li className='signup-nav' onClick={props.openModalHandler}>Sign Up</li>
                {TokenService.hasAuthToken() ? <><li className='signup-nav' onClick={props.logOut} ><Link to='/'>Log Out</Link></li> <li><Link to='/dashboard'>Dashboard</Link></li> </>:
                    <li className='signup-nav'><Link to='/login'>Log In</Link></li>}
            </ul>
        </nav>
    )
}

export default LandingNav;