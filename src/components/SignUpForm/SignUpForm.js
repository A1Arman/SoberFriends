import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import config from '../../config';
import ValidationError from '../ValidationError/ValidationError';

const { API_BASE_URL } = config

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            money_spent: '',
            impact: '',
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            impactValid: false,
            money_spentValid: false,
            passwordMatch: false,
            validationMessages: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: '',
                money_spent: '',
                impact: ''
            }

        }
    }

    handleUserSubmit = e => {
        e.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            money_spent: this.state.money_spent,
            impact: this.state.impact
        }
 
        fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.json())
                }
            })
            .then(user => {
                console.log('ran')
                const form = document.getElementById('signup-form');
                form.reset();
                window.location.href = '/login'
            })
            .catch(error => {
                this.setState({signupError: error})
            })
    }

    validateFirstName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.name = 'Name is required';
        hasError = true;
        } else {
        fieldErrors.name = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        firstNameValid: !hasError
        }, this.formValid);
    }

    validateLastName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.name = 'Name is required';
        hasError = true;
        } else {
        fieldErrors.name = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        lastNameValid: !hasError
        }, this.formValid);
    }

    validatePassword(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
        fieldErrors.password = 'Password is required';
        hasError = true;
        } else {
        if (fieldValue.length < 8 || fieldValue.length > 72) {
            fieldErrors.password = 'Password must be between 8 and 72 characters long';
            hasError = true;
        } else {
            /* eslint-disable */
            if(!fieldValue.match(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))) {
            /* eslint-disable */
            fieldErrors.password = 'Password must contain at least one number and one letter and one special character';
            hasError = true;
            } else {
            fieldErrors.password = '';
            hasError = false;
            }
        }
        }

        this.setState({
        validationMessages: fieldErrors,
        passwordValid: !hasError
        }, this.formValid );

    }

    validateEmail(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.email = 'Email is required';
        hasError = true;
        } else {
        /* eslint-disable */
        if (!fieldValue.match(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
        /* eslint-disable */
            fieldErrors.email = 'Invalid Email Address'
            hasError = true;
        } else {
            fieldErrors.email = '';
            hasError = false;
        }
        }

        this.setState({
        validationMessages: fieldErrors,
        emailValid: !hasError
        }, this.formValid)
    }

    validateImpact(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.name = 'Impact is required';
        hasError = true;
        } else {
        fieldErrors.name = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        impactValid: !hasError
        }, this.formValid);
    }

    validateMoney(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
        fieldErrors.name = 'Money Spent is required';
        hasError = true;
        } else {
        fieldErrors.name = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        money_spentValid: !hasError
        }, this.formValid);
    }

    matchPasswords(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;

        const password = this.state.password;

        if(fieldValue !== password) {
        fieldErrors.repeatPassword = 'Passwords do not match';
        hasError = true;
        } else {
        fieldErrors.repeatPassword = '';
        hasError = false;
        }

        this.setState({
        validationMessages: fieldErrors,
        passwordMatch: !hasError
        }, this.formValid );

    }

    formValid() {
        this.setState({
        formValid: this.state.emailValid && this.state.passwordValid && this.state.passwordMatch
        })
    }

    updateFirstName(name) {
        this.setState({first_name: name}, () => {this.validateFirstName(name)});
    }

    updateLastName(name) {
        this.setState({last_name: name}, () => {this.validateLastName(name)})
    }

    updatePassword(password) {
        this.setState({password}, () => {this.validatePassword(password)})
    }

    updateRepeatPassword(repeatPassword) {
        this.setState({repeatPassword}, () => {this.matchPasswords(repeatPassword)})
    }

    updateEmail(email) {
        this.setState({email}, () => {this.validateEmail(email)})
    }

    updateImpact(impact) {
        this.setState({impact}, () => {this.validateImpact(impact)})
    }

    updateMoneySpent(money_spent) {
        this.setState({money_spent}, () => {this.validateMoney(money_spent)})
    }
    
    render() {
        return (
            <div>
                <div className='modal-wrapper'
                    style={{
                        transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className='modal-header'>
                        <h3 className='signup-title'>Your Freedom Starts Now</h3>
                    </div>
                    <div className='modal-body'>
                        <form className='signup-form' id='signup-form' onSubmit={(event) => this.handleUserSubmit(event)}>
                            <div className='grid-container'>
                                <label htmlFor='first_name'>First name:</label>
                                <input placeholder='First Name' type='text' name='first_name' id='first_name' onChange={e => this.updateFirstName(e.target.value)} required/>
                                <ValidationError hasError={!this.state.firstNameValid} message={this.state.validationMessages.name}/>  
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='last_name'>Last name:</label>
                                <input type='text' name='last_name' id='last_name' placeholder='Last Name' onChange={e => this.updateLastName(e.target.value)} required/>
                                <ValidationError hasError={!this.state.lastNameValid} message={this.state.validationMessages.name}/>
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='email'>Email:</label>
                                <input type='email' name='email' id='email' onChange={e => this.updateEmail(e.target.value)} required/>
                                <ValidationError hasError={!this.state.emailValid} message={this.state.validationMessages.email} />
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='password'>Password:</label>
                                <input type='password' name='password' minLength='8' id='password'  onChange={e => this.updatePassword(e.target.value)} required/>
                                <ValidationError hasError={!this.state.passwordValid} message={this.state.validationMessages.password}/>
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='confirm'>Confirm Password:</label>
                                <input type='password' name='confirm' id='confirm' minLength='8' onChange={e => this.updateRepeatPassword(e.target.value)} required/>
                                <ValidationError hasError={!this.state.passwordMatch} message={this.state.validationMessages.repeatPassword}/>
                            </div>
                            <div className='grid-container'>
                                <label htmlFor='money_spent'>Money Spent(Daily):</label>
                                <input type='number' name='money_spent' min='0' max='1,000,000,000' placeholder='Whole number' onChange={e => this.updateMoneySpent(e.target.value)} required/>
                                <ValidationError hasError={!this.state.money_spentValid} message={this.state.validationMessages.money_spent}/>  
                            </div>
                            <div className='grid-container'>
                                <label htmlFor="impact">How will your life change?</label>
                                <input type='text' name="impact" row="15" placeholder="Quitting my addiction will improve my life by:" onChange={e => this.updateImpact(e.target.value)} required></input>
                                <ValidationError hasError={!this.state.impactValid} message={this.state.validationMessages.impact}/>  
                            </div>
                            <div>
                                <p className="login-accnt">Have an Account? <Link to='/login' onClick={this.props.close}>Login Here</Link></p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-cancel" onClick={this.props.close}><span>CLOSE</span></button>
                                <button className="btn-continue" type='submit' disabled={!this.state.formValid}><span>CONTINUE</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}  


export default SignUpForm;