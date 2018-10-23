import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

import validator from 'validator';
import tools from '../utils/tools.js'

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
        
        this.props.initialize(initData);
    }

    renderField(field) {
		const { meta: { touched, error } } = field;
		const className= `input ${touched && error ? 'is-danger' : ''}`;

		return (
			<div className="card__form--field">
				<label className={field.className1}>{field.label}</label>
				<input
					className={field.className2}
					type={field.type}
					placeholder={field.placeholder}
					{ ...field.input}
				/>
				<div className= "help is-danger">
					{touched ? error : ''}
				</div>
			</div>
		);
    }

    onSubmit(values) {
        axios.post('http://localhost:8080/api/users', values).then((res) => {
            console.log(res.data)
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
                                className1="card__form--input-label"
                                className2="card__form--input-input"
                                label="Firstname"
                                name="firstname"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
                            <Field
                                className1="card__form--input-label"
                                className2="card__form--input-input"
                                label="Lastname"
                                name="lastname"
                                type="text"
                                component= {this.renderField}
                                placeholder=""
                            />
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
                                label="Email"
                                name="email"
                                type="email"
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
                            <button type="submit" className="btn btn-primary btn-primary--pink">Sign Up</button>
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
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 15 })) {
        errors.firstname = "Your firstname is too short or too long"
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain just letter"
    }

    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 15 })) {
        errors.lastname = "Your lastname is too short or too long"
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain just letter"
    }

    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 15 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlpha(values.username)) {
        errors.username = "Your username must contain just letter"
    }

    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!tools.isEmail(values.email)) {
        errors.password = "Your email is wrong"
    }

    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letterand a number"
    }

    return errors;
}

const reduxFormSignUp = reduxForm({
    validate,
    form: 'signup'
})(SignUp);

export default connect(null, null)(reduxFormSignUp);