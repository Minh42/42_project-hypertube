import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import validator from 'validator';
import izitoast from 'izitoast';
import tools from '../utils/tools.js';

class SignUp extends Component {   

    constructor(props) {
        super(props);
        const initData = {
            "firstname": null,
            "lastname": null,
            "username": null,
            "email": null,
            "password": null
        };
        this.state = {
			messageSuccess : "",
			messageError: ""
        }
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

    renderMessages() {
		if (this.state.messageSuccess) {
			return (
				<p className="card__form--input-success">{this.state.messageSuccess}</p>
			)
		}
		if (this.state.messageError) {
			return (
				<p className="card__form--input-error">{this.state.messageError}</p>	
			)
		}
	}


    onSubmit(values) {
        var message;
        axios.post('http://localhost:8080/api/users', values)
        .catch((err) => {
            switch (err.response.status) {
                case 409 :
                    message = 'Invalid username or email';
                    break;
                case 500:
                    message = 'Your information is invalid';
                    break;
                default: 
                    break;
            }
            izitoast.error({
                message: message,
                position: 'topRight'
            });
        }) 
        .then((res) => {
            if (res) {
                izitoast.success({
                    message: res.data.message,
                    position: 'topRight'
                });
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="card__side card__side--back">
                <div className="card__text">
                    <h4>
                        You want to see our film's selection
                    </h4>
                    <h2 className="card__text-span">
                    <span className="card__text-span--1">
                        sign up now
                        </span> 
                    </h2>  
                    </div>
                    <div className="card__form">
                        <form className="card__form--input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Firstname"
                                name="firstname"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                label="Lastname"
                                name="lastname"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                label="Email"
                                name="email"
                                type="email"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                placeholder=""
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-primary btn-primary--pink">Sign Up</button>
                            { this.renderMessages() }
                        </form>
                    </div>
                </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.firstname) {
        errors.firstname = "Please enter your firstname"
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 30 })) {
        errors.firstname = "Your firstname is too short or too long"
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain only alphabetic characters"
    }

    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 30 })) {
        errors.lastname = "Your lastname is too short or too long"
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain only alphabetic characters"
    }

    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 30 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = "Your username must contain only alphanumeric characters"
    }

    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = "Please enter a valid email address"
    }

    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letter and a number"
    }
    return errors;
}

const reduxFormSignUp = reduxForm({
    validate,
    form: 'signup'
})(SignUp);

export default reduxFormSignUp;