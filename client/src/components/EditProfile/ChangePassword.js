import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import axios from 'axios';
import izitoast from 'izitoast';
import tools from '../../utils/tools.js';
import { translate } from 'react-i18next';
import { withCredentials } from '../../utils/headers';

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
        axios.post('http://localhost:8080/api/verification/changePassword', dataReset, withCredentials())
        .catch((err) => {
            if (err) {
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
            }
        })
        .then((res) => {
            if (res) {
                izitoast.success({
                    message: res.data.message,
                    position: 'topRight'
                });
                this.props.history.push('/');
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        const { t, i18n } = this.props; 
        return (
            <div className="forgot-password">
                <div className="form">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <FormHeader 
                                heading1 = { t('ChangePassword.title', { framework: "react-i18next" }) }
                                heading2 = { t('ChangePassword.subtitle', { framework: "react-i18next" }) }
                            />
                            <div className="card__form">
                                <form className="card__form--input" onSubmit={handleSubmit(this.submitNewPassword.bind(this))}>  
                                    <Field
                                        label={ t('ChangePassword.new', { framework: "react-i18next" }) }
                                        name="password"
                                        type="password"
                                        placeholder=""
                                        component={RenderField}
                                    />
                                    <Field
                                        label={ t('ChangePassword.confirm', { framework: "react-i18next" }) }
                                        name="confirmPassword"
                                        type="password"
                                        placeholder=""
                                        component={RenderField}
                                    /> 
                                    <button className="btn btn-primary btn-primary--pink" type="submit">{ t('ChangePassword.button', { framework: "react-i18next" }) }</button>
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

export default translate('common')(withRouter(reduxFormChangePassword));