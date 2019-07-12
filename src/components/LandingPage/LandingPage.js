import React from 'react';
import './LandingPage.css'
import SignUpForm from '../SignUpForm/SignUpForm';

function LandingPage(props) {
    return (
        <>
            { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
            <main role="main">
                {props.isShowing ? <SignUpForm className='modal' handleSubmit={props.handleUserSubmit} show={props.isShowing} close={props.closeModalHandler}></SignUpForm> : null}
                <header role="banner">
                    <h1>SoberFriends</h1>
                    <h2>One Community One Mission</h2>
                </header>
                <section>
                    <header>
                        <h3>The Mission</h3>
                    </header>
                    <p>SoberFriends helps you quit your addiction by allowing you to connect with other people in your situation. This allows you to be held accountable by your peers. Knowing that someone else is going through what you are and working on it together is an amazing feeling. Not only this, but it gives you a sense of commitment to staying off your addiction.</p>
                </section>
            </main>
        </>
    )
}

export default LandingPage;