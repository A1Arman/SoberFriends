import React from 'react';
import { Link } from 'react-router-dom';


function LandingNav(props) {
    return (
        <nav className='nav' role="navigation">
            <ul>
                <li className='title'><Link to='/'>SoberFriends</Link></li>
                <li className='signup-nav' onClick={props.openModalHandler}>Sign Up</li>
            </ul>
        </nav>
    )
}

export default LandingNav;