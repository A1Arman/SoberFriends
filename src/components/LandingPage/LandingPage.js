import React from 'react';
import './LandingPage.css'
import SignUpForm from '../SignUpForm/SignUpForm';

function LandingPage(props) {
    return (
        <>
            { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
            <main role="main">
                {props.isShowing ? <SignUpForm className='modal' handleSubmit={props.handleUserSubmit} show={props.isShowing} close={props.closeModalHandler}></SignUpForm> : null}
                <header className="main-header-container" role="banner">
                        <svg className="pulse" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                            <circle id="Oval" cx="512" cy="512" r="512"></circle>
                        </svg>
                        <h1 className='main-heading'>SoberFriends</h1>
                        <h2 className='tagline'>One Community One Mission</h2>
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