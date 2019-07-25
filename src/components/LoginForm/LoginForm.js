import React from 'react';
import SignUpForm from '../SignUpForm/SignUpForm';
import './LoginForm.css';

function LoginForm(props) {
    return (
        <>
        { props.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null }
        <section className='flex-container'>
            {props.isShowing ? <SignUpForm className='modal' handleSubmit={props.handleUserSubmit} show={props.isShowing} close={props.closeModalHandler}></SignUpForm> : null}
            <form className='login-form' onSubmit={props.handleLogin}>
                <h2 className='login-title'>Log In</h2>
                <div className='grid-container'>
                    <label htmlFor='email' className='email'>Email</label>
                    <input type='email' name='email' id='email' required/>
                </div>
                <div className='grid-container'>
                    <label htmlFor='password' className='password'>Password</label>
                    <input type='password' name='password' id='password' required/>
                </div>
                <button className="btn-login" type='submit'><span>CONTINUE</span></button>
                {props.logInError ? <p>Incorrect Email or Password</p> : null}
            </form>
        </section>
        </>
    )
}

export default LoginForm;