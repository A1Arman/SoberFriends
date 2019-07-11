import React from 'react';
import './SignUpForm.css';

function SignUpForm(props) {
        return (
            <div>
                <div className='modal-wrapper'
                    style={{
                        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className='modal-header'>
                        <h3>Your Freedom Starts Now</h3>
                    </div>
                    <div className='modal-body'>
                    <form className='signup-form'>
                        <div className='grid-container'>
                            <label htmlFor='first-name'>First name</label>
                            <input placeholder='First Name' type='text' name='first-name' id='first-name' required/>
                        </div>
                        <div className='grid-container'>
                            <label htmlFor='last-name'>Last name</label>
                            <input type='text' name='last-name' id='last-name' placeholder='Last Name' required/>
                        </div>
                        <div className='grid-container'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' required/>
                        </div>
                        <div className='grid-container'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' required/>
                        </div>
                        <div className='grid-container'>
                            <label htmlFor='money-spent'>Money Spent(Daily)</label>
                            <input type='number' name='money-spent' min='0' max='1,000,000,000' placeholder='Whole number' required/>
                        </div>
                        <div className='grid-container'>
                            <label htmlFor="impact">How will your life change?</label>
                            <textarea name="impact" row="15" placeholder="When you beat your addiction how will it impact your life?" required></textarea>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                        <button className="btn-continue" type='submit'>CONTINUE</button>
                    </div>
                </div>
            </div>
        )
}  


export default SignUpForm;