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
                        <form className='signup-form' onSubmit={props.handleSubmit}>
                            <div className='grid-container'>
                                <label htmlFor='first_name'>First name</label>
                                <input placeholder='First Name' type='text' name='first_name' id='first_name' required/>
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='last_name'>Last name</label>
                                <input type='text' name='last_name' id='last_name' placeholder='Last Name' required/>
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
                                <label htmlFor='money_spent'>Money Spent(Daily)</label>
                                <input type='number' name='money_spent' min='0' max='1,000,000,000' placeholder='Whole number' required/>
                            </div>
                            <div className='grid-container'>
                                <label htmlFor="impact">How will your life change?</label>
                                <textarea name="impact" row="15" placeholder="When you beat your addiction how will it impact your life?" required></textarea>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                                <button className="btn-continue" type='submit'>CONTINUE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
}  


export default SignUpForm;