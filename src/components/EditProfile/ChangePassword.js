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
        this.state = {
            user_id : this.props.match.params.id
         }

        this.submitNewPassword = this.submitNewPassword.bind(this)
    }

    async submitNewPassword(values) {
        console.log(values);
        var dataReset = { password : values.password,
            confirmedNewPassword : values.confirmPassword,
            user_id : this.state.user_id
        }
        const res = await axios.post('http://localhost:8080/api/verification/changePassword', dataReset)
        .catch((err) => {
            if (err) {
                izitoast.error({
                    message: 'Your passwords not matched',
                    position: 'topRight'
                });
            }
        })
        .then((res) => {
            if (res) {
                this.props.history.push('/')
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
        <div className="forgot-password">
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