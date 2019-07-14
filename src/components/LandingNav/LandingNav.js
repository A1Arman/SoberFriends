import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './LandingNav.css';

function LandingNav(props) {
    return (
        <nav role="navigation">
            <ul>
                <li className='title'><Link to='/'>SoberFriends</Link></li>
                <li id='signup' onClick={props.openModalHandler}>Sign Up</li>
                {TokenService.hasAuthToken() ? <li><Link to='/posts'>Posts</Link></li> : <li><Link to='/login'>Posts</Link></li>}
            </ul>
        </nav>
    )
}

export default LandingNav;