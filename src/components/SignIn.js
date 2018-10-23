import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validator from 'validator';
import tools from '../utils/tools.js'

import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';
import { ReactComponent as Facebook} from '../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../assets/img/svg/github.svg';
import { ReactComponent as School} from '../assets/img/svg/42_logo.svg';

class SignIn extends Component {   
    constructor(props) {
        super(props);
        const initData = {
            "username": null,
            "password": null
        };
        this.props.initialize(initData);
    }

    renderField(field) {
		const { meta: { touched, error } } = field;

		return (
			<div className="card__form--field">
				<label className="card__form--input-label">{field.label}</label>
				<input
					className="card__form--input-input"
					type={field.type}
					placeholder={field.placeholder}
					{ ...field.input}
				/>
				<div className= "card__form--input-error">
					{touched ? error : ''}
				</div>
			</div>
		);
    }

    
    onSubmit() {


    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="card__side card__side--front">
                <div className="card__text">
                    <h4>
                        Already client? choose your movie
                    </h4>
                    <h2 className="card__text-span">
                        <span className="card__text-span--1">
                            sign in now
                        </span>
                    </h2>  
                    </div>
                    <div className="card__form">
                        <form className="card__form--input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                className1="card__form--input-label"
                                className2="card__form--input-input"
                                label="Username"
                                name="username"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                className1="card__form--input-label"
                                className2="card__form--input-input"
                                label="New Password"
                                name="password"
                                type="password"
                                placeholder=""
                                component={this.renderField}
                            />
                            <button className="btn btn-primary btn-primary--pink" type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="card__forgot">
                            Forgot password?
                    </div>
                    <div className="card__OAuth">
                        <Facebook className="card__OAuth--icon" fill='#777'/>
                        <Twitter className="card__OAuth--icon" fill='#777'/>
                        <Google className="card__OAuth--icon" fill='#777'/>
                        <LinkedIn className="card__OAuth--icon" fill='#777'/>
                        <Github className="card__OAuth--icon" fill='#777'/>
                        <School className="card__OAuth--icon42" fill='#777'/>
                    </div>
                    <div className="card__newClient">
                        <span>New client</span>
                        <Chevron className="icon" fill='rgb(216, 3, 81)'/>
                    </div>
                </div>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 15 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = "Your username must contain only alphanumeric characters"
    }

    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letterand a number"
    }
    return errors;
}

const reduxFormSignIn = reduxForm({
    validate,
    form: 'signin'
})(SignIn);

export default connect(null, null)(reduxFormSignIn);