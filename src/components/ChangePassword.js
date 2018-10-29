import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import izitoast from 'izitoast';
import tools from '../utils/tools.js';  


class ChangePassword extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            user_id : this.props.match.params.id
         }

        this.submitNewPassword = this.submitNewPassword.bind(this)
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

    async submitNewPassword(values) {
        console.log(values);
        var dataReset = { newPasswordReset : values.password,
            confirmedNewPassword : values.confirmPassword,
            user_id : this.state.user_id
        }
        const res = await axios.post('http://localhost:8080/api/verification/changePassword', dataReset)
        // if (res) {
        //     izitoast.success({
        //         message: res.data.message,
        //         position: 'topRight'
        //     });
        // }
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
                                Please enter you new password and submit.
                            </h4>
                            <h2 className="card__text-span">
                                <span className="card__text-span--1">
                                    New Password
                                </span>
                            </h2>  
                        </div>
                        <div className="card__form">
                            <form className="card__form--input" onSubmit={handleSubmit(this.submitNewPassword.bind(this))}>  
                                <Field
                                    label="New password"
                                    name="password"
                                    type="password"
                                    placeholder=""
                                    component={this.renderField}
                                />
                                <Field
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder=""
                                    component={this.renderField}
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
    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letterand a number"
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Please enter your confirmation password"
    } else if (!tools.isPassword(values.confirmPassword)) {
        errors.confirmPassword = "Your confirmation password must contain at least 6 character, a capital letterand a number"
    }

    return errors;
}


const reduxFormChangePassword = reduxForm({
    validate,
    form: 'changePassword'
})(ChangePassword);

export default reduxFormChangePassword;