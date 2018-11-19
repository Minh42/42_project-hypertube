import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone'
import RenderField from './Form/RenderField';
import FormHeader from './Form/FormHeader';
import axios from 'axios';
import validator from 'validator';
import izitoast from 'izitoast';
import tools from '../utils/tools.js';
import { withNamespaces } from 'react-i18next';

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
        const { t } = this.props;
        let message;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('filename', files[0].name);
        axios.post('http://localhost:8080/api/verification/upload', data)
            .catch((err) => {
                if (err) {
                    switch (err.response.status) {
                        case 404 :
                            message = t('Izitoast.pictureInvalid', { framework: "react-i18next" })
                            break;
                        case 500:
                            message = t('Izitoast.error500', { framework: "react-i18next" });
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
                        message: t('Izitoast.pictureValid', { framework: "react-i18next" }),
                        position: 'topRight'
                    });
                }
            })
    }

    onSubmit(values) {
        const { t } = this.props;
        var data = { values: values, path: this.state.files }
        let message;
        axios.post('http://localhost:8080/api/users', data)
        .catch((err) => {
            switch (err.response.status) {
                case 400 :
                    message = t('Izitoast.picture', { framework: "react-i18next" });
                    break;
                case 409 :
                    message = t('Izitoast.errorEmail', { framework: "react-i18next" });
                    break;
                case 500:
                    message = t('Izitoast.errorInfo', { framework: "react-i18next" });
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
                <div className="card__form--picture pointer">
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
                        <button type="submit" className="btn btn-primary btn-primary--pink pointer">{ t('SignUp.button', { framework: "react-i18next" }) }</button>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(values, props) {
    const { t } = props;
    const errors = {};

    if (!values.firstname) {
        errors.firstname = t('Validate.firstname', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 30 })) {
        errors.firstname = t('Validate.length.firstname', { framework: "react-i18next" })
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = t('Validate.other.firstname', { framework: "react-i18next" })
    }

    if (!values.lastname) {
        errors.lastname = t('Validate.lastname', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 30 })) {
        errors.lastname = t('Validate.length.lastname', { framework: "react-i18next" })
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = t('Validate.other.lastname', { framework: "react-i18next" })
    }

    if (!values.username) {
        errors.username = t('Validate.username', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.username, { min : 1, max : 30 })) {
        errors.username = t('Validate.lenght.username', { framework: "react-i18next" })
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = t('Validate.other.username', { framework: "react-i18next" })
    }

    if (!values.email) {
        errors.email = t('Validate.email', { framework: "react-i18next" })
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = t('Validate.other.email', { framework: "react-i18next" })
    }

    if (!values.password) {
        errors.password = t('Validate.password', { framework: "react-i18next" })
    } else if (!tools.isPassword(values.password)) {
        errors.password = t('Validate.other.password', { framework: "react-i18next" })
    }
    return errors;
}

const reduxFormSignUp = reduxForm({
    validate,
    form: 'signup'
})(SignUp);

export default withNamespaces('common')(reduxFormSignUp);