import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNav.css';

function LandingNav(props) {
    return (
        <nav role="navigation">
            <ul>
                <li id='signup' onClick={props.openModalHandler}>Sign Up</li>
                <li><Link to='/posts'>Demo</Link></li>
            </ul>
        </nav>
    )
}

export default LandingNav;