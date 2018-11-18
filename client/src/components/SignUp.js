import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone'
import RenderField from './Form/RenderField';
import FormHeader from './Form/FormHeader';
import axios from 'axios';
import validator from 'validator';
import izitoast from 'izitoast';
import tools from '../utils/tools.js';
import { translate } from 'react-i18next';

class SignUp extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            files: null 
        }
    }

    componentDidMount() {
        const initData = {
            "firstname": null,
            "lastname": null,
            "username": null,
            "email": null,
            "password": null
        };
        this.props.initialize(initData);
    }
 
    onDrop(files) {
        let message;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('filename', files[0].name);
        axios.post('http://localhost:8080/api/verification/upload', data)
            .catch((err) => {
                if (err) {
                    switch (err.response.status) {
                        case 404 :
                            message = 'Upload file is invalid';
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
                    this.setState({
                        files: res.data
                    });
                    izitoast.success({
                        message: 'Your picture is valid',
                        position: 'topRight'
                    });
                }
            })
    }

    onSubmit(values) {
        var data = { values: values, path: this.state.files }
        let message;
        axios.post('http://localhost:8080/api/users', data)
        .catch((err) => {
            switch (err.response.status) {
                case 400 :
                    message = 'Please upload a profile picture';
                    break;
                case 409 :
                    message = 'Invalid username or email';
                    break;
                case 500:
                    message = 'Your information is invalid';
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
            }
        })
    }

    render() {
        const { handleSubmit } = this.props;
        const { t } = this.props;
        let path;

        if (this.state.files !== null) 
            path = this.state.files;
        else 
            path = require('../assets/img/photo2.jpg');
       
        const dropzoneStyle = {
            width: 110,
            height: 100,
            borderRadius: 20,
            border: "none",
            position: "relative"
        };

        return (
            <div className="card__side card__side--back">
                <FormHeader 
                    heading1 = { t('SignUp.title', { framework: "react-i18next" }) }
                    heading2 = { t('SignUp.subtitle', { framework: "react-i18next" }) }
                />
                <div className="card__form">
                <div className="card__form--picture">
                    <div className="card__form--picture-block">
                        <img className="card__form--picture-block-img" src={path} alt="img"/>
                        <Dropzone multiple={false} 
                            accept="image/*" 
                            onDrop={this.onDrop.bind(this)} 
                            style={dropzoneStyle}
                            >
                            <p className="card__form--picture-block-text">{ t('SignUp.picture', { framework: "react-i18next" }) }</p>
                        </Dropzone>
                    </div>
                </div>
                    <form className="card__form--input" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label={ t('SignUp.firstname', { framework: "react-i18next" }) }
                            name="firstname"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label={ t('SignUp.lastname', { framework: "react-i18next" }) }
                            name="lastname"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label={ t('SignUp.username', { framework: "react-i18next" }) }
                            name="username"
                            type="text"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label={ t('SignUp.email', { framework: "react-i18next" }) }
                            name="email"
                            type="email"
                            component= {RenderField}
                            placeholder=""
                        />
                        <Field
                            label={ t('SignUp.password', { framework: "react-i18next" }) }
                            name="password"
                            type="password"
                            placeholder=""
                            component={RenderField}
                        />
                        <button type="submit" className="btn btn-primary btn-primary--pink">{ t('SignUp.button', { framework: "react-i18next" }) }</button>
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
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 30 })) {
        errors.firstname = "Your firstname is too short or too long"
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain only alphabetic characters"
    }

    if (!values.lastname) {
        errors.lastname = "Please enter your lastname"
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 30 })) {
        errors.lastname = "Your lastname is too short or too long"
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain only alphabetic characters"
    }

    if (!values.username) {
        errors.username = "Please enter your username"
    } else if (!validator.isByteLength(values.username, { min : 1, max : 30 })) {
        errors.username = "Your username is too short or too long"
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = "Your username must contain only alphanumeric characters"
    }

    if (!values.email) {
        errors.email = "Please enter your email"
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = "Please enter a valid email address"
    }

    if (!values.password) {
        errors.password = "Please enter your password"
    } else if (!tools.isPassword(values.password)) {
        errors.password = "Your password must contain at least 6 character, a capital letter and a number"
    }
    return errors;
}

const reduxFormSignUp = reduxForm({
    validate,
    form: 'signup'
})(SignUp);

export default translate('common')(reduxFormSignUp);