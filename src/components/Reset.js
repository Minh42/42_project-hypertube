import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import validator from 'validator';
import izitoast from 'izitoast';


class ForgotPassword extends Component {   
    constructor(props) {
        super(props);

        this.submitMessageReset = this.submitMessageReset.bind(this)
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

    async submitMessageReset(email) {
        console.log(email);
        const res = await axios.post('http://localhost:8080/api/verification/sendMessageReset', email)
        if (res) {
            izitoast.success({
                message: res.data.message,
                position: 'topRight'
            });
        }
    }

    render() {
        const { handleSubmit } = this.props;  
        return (
        <div className="forgot-password">
            <div className="form">
                <div className="card">
                    <div className="card__side card__side--front">
                        <div className="card__text">
                            <h4>
                                Need to change your password?
                            </h4>
                            <h2 className="card__text-span">
                                <span className="card__text-span--1">
                                    Your email
                                </span>
                            </h2>  
                        </div>
                        <div className="card__form">
                            <form className="card__form--input" onSubmit={handleSubmit(this.submitMessageReset.bind(this))}>  
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    component= {this.renderField}
                                    placeholder=""
                                />
                                <button className="btn btn-primary btn-primary--pink" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = "Please enter a valid email address"
    }
    return errors;
}


const reduxFormForgotPassword = reduxForm({
    validate,
    form: 'forgotPassword'
})(ForgotPassword);

export default connect(null, null)(reduxFormForgotPassword);