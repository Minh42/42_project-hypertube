import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInAction } from '../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import validator from 'validator';
import tools from '../utils/tools.js';  

import Oauth from './Signin/Oauth';
import RenderField from './Form/RenderField';
import FormHeader from './Form/FormHeader';
import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';

import { withNamespaces } from 'react-i18next';

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

    showPageReset() {
        this.props.history.push('/reset')
    }

    onSubmit(values) {
        const { t } = this.props;
        this.props.signInAction(values, t, this.props.history);
    }

    render() {
        const { handleSubmit } = this.props;
        const { t } = this.props;
        return (
            <div className="card__side card__side--front">
                <FormHeader 
                    heading1 = { t('SignIn.title', { framework: "react-i18next" }) }
                    heading2 = { t('SignIn.subtitle', { framework: "react-i18next" }) }
                />
                <div className="card__form">
                    <form className="card__form--input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            className1="card__form--input-label"
                            className2="card__form--input-input"
                            label= { t('SignIn.username', { framework: "react-i18next" }) }
                            name="username"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            className1="card__form--input-label"
                            className2="card__form--input-input"
                            label={ t('SignIn.password', { framework: "react-i18next" }) }
                            name="password"
                            type="password"
                            placeholder=""
                            component={RenderField}
                        />
                        <button className="btn btn-primary btn-primary--pink pointer" type="submit">{ t('SignIn.button', { framework: "react-i18next" }) }</button>
                    </form>
                </div>
                <div className="card__forgot">
                    <p className="card__forgot--link pointer" onClick={this.showPageReset}>{ t('SignIn.forgotPassword', { framework: "react-i18next" }) }</p>
                </div>
                <Oauth />
                <div className="card__newClient">
                    <span>{ t('SignIn.newClient', { framework: "react-i18next" }) }</span>
                    <Chevron className="icon" fill='rgb(216, 3, 81)'/>
                </div>
            </div>
        )
    }
}

function validate(values, props) {
    const { t } = props;
    const errors = {};

    if (!values.username) {
        errors.username = t('Validate.username', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.username, { min : 1, max : 15 })) {
        errors.username = t('Validate.lenght.username', { framework: "react-i18next" })
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = t('Validate.other.username', { framework: "react-i18next" })
    }
    if (!values.password) {
        errors.password = t('Validate.password', { framework: "react-i18next" })
    } else if (!tools.isPassword(values.password)) {
        errors.password = t('Validate.other.password', { framework: "react-i18next" })
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

export default withNamespaces('common')(withRouter(connect(null, mapDispatchToProps)(reduxFormSignIn)));
