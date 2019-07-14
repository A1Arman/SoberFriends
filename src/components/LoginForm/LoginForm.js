import React from 'react';

function LoginForm(props) {
    return (
        <section>
            <h3>Log In</h3>
            <form className='login-form' onSubmit={props.handleLogin}>
                <div className='grid-container'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' required/>
                </div>
                <div className='grid-container'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' required/>
                </div>
                <button className="btn-login" type='submit'>CONTINUE</button>
            </form>
        </section>
    )
}

export default LoginForm;