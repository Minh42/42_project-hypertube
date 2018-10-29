import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInAction } from '../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import validator from 'validator';
import tools from '../utils/tools.js';  

import Oauth from './signin/Oauth';
import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';

class SignIn extends Component {   
    constructor(props) {
        super(props);
        const initData = {
            "username": null,
            "password": null
        };
        this.props.initialize(initData);

        this.showPageReset = this.showPageReset.bind(this)
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

    showPageReset() {
        this.props.history.push('/reset')
    }

    onSubmit(values) {
        this.props.signInAction(values, this.props.history);
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
                                label="Password"
                                name="password"
                                type="password"
                                placeholder=""
                                component={this.renderField}
                            />
                            <button className="btn btn-primary btn-primary--pink" type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="card__forgot">
                            <a className="card__forgot--link" onClick={this.showPageReset}>Forgot password?</a>
                    </div>
                    <Oauth />
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

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInAction : signInAction}, dispatch);
} 

const reduxFormSignIn = reduxForm({
    validate,
    form: 'signin'
})(SignIn);

export default withRouter(connect(null, mapDispatchToProps)(reduxFormSignIn));
