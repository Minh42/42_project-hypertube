import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import axios from 'axios';
import izitoast from 'izitoast';
import tools from '../../utils/tools.js';  

class ChangePassword extends Component {   
    constructor(props) {
        super(props);
        this.submitNewPassword = this.submitNewPassword.bind(this)
    }

    submitNewPassword(values) {
        let message;
        const dataReset = { 
            password : values.password,
            confirmedNewPassword : values.confirmPassword,
            user_id : this.props.match.params.id
        }
        axios.post('http://localhost:8080/api/verification/changePassword', dataReset)
        .catch((err) => {
            switch (err.response.status) {
                case 403 :
                    message = 'Passwords do not match';
                    break;
                case 500:
                    message = 'Oops, something went wrong!';
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
                if(this.props.history.location.pathname !== '/profile') {
                    this.props.history.push('/')
                } 
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;  
        return (
            <div className="form">
                <div className="card">
                    <div className="card__side card__side--front">
                        <FormHeader 
                            heading1 = "Please enter you new password and submit."
                            heading2 = "New Password"
                        />
                        <div className="card__form">
                            <form className="card__form--input" onSubmit={handleSubmit(this.submitNewPassword.bind(this))}>  
                                <Field
                                    label="New password"
                                    name="password"
                                    type="password"
                                    placeholder=""
                                    component={RenderField}
                                />
                                <Field
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder=""
                                    component={RenderField}
                                /> 
                                <button className="btn btn-primary btn-primary--pink" type="submit">Submit</button>
                            </form>
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

export default withRouter(reduxFormChangePassword);