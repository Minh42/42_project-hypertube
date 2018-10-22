import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class SignUp extends Component {   

    constructor(props) {
        super(props);

        const initData = {
            "username": null,
            "password": null
        };
        
        this.props.initialize(initData);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {


    }

    render() {
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
                        <form className="card__form--input">
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
                            <button className="btn btn-primary btn-primary--pink" type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
        )
    }
}

function validate(values) {
    console.log(values)
    const errors = {};
    if (!values.firstname) {
        errors.firstname = "Please enter your firstname"
    }
    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    }
    if (!values.username) {
        errors.username = "Please enter your username"
    }
    if (!values.email) {
        errors.email = "Please enter your email"
    }
    if (!values.password) {
        errors.password = "Please enter your password"
    }
    return errors;
}


const reduxFormSignUp = reduxForm({
    validate,
    form: 'signUp'
})(SignUp);

export default connect(null, null)(reduxFormSignUp);