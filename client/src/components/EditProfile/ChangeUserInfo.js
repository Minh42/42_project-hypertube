import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import { signOutAction } from '../../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import izitoast from 'izitoast';
import validator from 'validator';
import { translate } from 'react-i18next';
import { withCredentials } from '../../utils/headers';

class ChangeUserInfo extends Component {
    componentDidMount() {
        if(this.props.user) {
            let initData = {
                "firstname": this.props.user.firstname,
                "lastname": this.props.user.lastname,
                "username": this.props.user.username,
                "email": this.props.user.email
            };
            this.props.initialize(initData);
        }
    }
    
    async changeUserInformation(values) {
        let message;
        let userID = this.props.user._id;

        try {
            const res = await axios.put('http://localhost:8080/api/users/' + userID, values, withCredentials());
            izitoast.success({
                message: res.data.message,
                position: 'topRight'
            });
        } catch (err) {
            switch (err.response.status) {
                case 401 :
                    izitoast.error({
                        message: 'Please retry to login',
                        position: 'topRight'
                    });
                    this.props.signOutAction(this.props.history);
                    break;
                case 403:
                    izitoast.error({
                        message: 'Please retry to login',
                        position: 'topRight'
                    });
                    this.props.signOutAction(this.props.history);
                    break;
                default: 
                    izitoast.error({
                        message: 'Oops, something went wrong!',
                        position: 'topRight'
                    });
                    break;
            }
        }
    }


    render() {
        const { handleSubmit } = this.props;
        const { t, i18n } = this.props; 
        return (
            <div className="form">
                <div className="card">
                    <div className="card__side card__side--front">
                        <FormHeader 
                            heading1 = { t('EditInfo.title', { framework: "react-i18next" }) }
                            heading2 = { t('EditInfo.subtitle', { framework: "react-i18next" }) }
                        />
                        <div className="card__form">
                            <form className="card__form--input" onSubmit={handleSubmit(this.changeUserInformation.bind(this))}>
                                <Field
                                    label={ t('EditInfo.firstname', { framework: "react-i18next" }) }
                                    name="firstname"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label={ t('EditInfo.lastname', { framework: "react-i18next" }) }
                                    name="lastname"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label={ t('EditInfo.username', { framework: "react-i18next" }) }
                                    name="username"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label={ t('EditInfo.email', { framework: "react-i18next" }) }
                                    name="email"
                                    type="email"
                                    component= {RenderField}
                                />
                                <button type="submit" className="btn btn-primary btn-primary--pink">{ t('EditInfo.button', { framework: "react-i18next" }) }</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.firstname) {
        errors.firstname = "Please enter your firstname"
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 15 })) {
        errors.firstname = "Your firstname is too short or too long"
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain only alphabetic characters"
    }

    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 15 })) {
        errors.lastname = "Your lastname is too short or too long"
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain only alphabetic characters"
    }

    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 15 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = "Your username must contain only alphanumeric characters"
    }

    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = "Please enter a valid email address"
    }
    return errors;
}

function mapStateToProps(state) {
    return {
	    user: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signOutAction : signOutAction}, dispatch);
} 

const reduxFormChangeUserInfo = reduxForm({
    validate,
    form: 'editProfile'
})(ChangeUserInfo);

export default translate('common')(withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxFormChangeUserInfo)));