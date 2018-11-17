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
import Dropzone from 'react-dropzone'
import { translate } from 'react-i18next';
import { withCredentials } from '../../utils/headers';

class ChangeUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null 
        }
    }

    async componentDidMount() {
        if(this.props.user) {
            let initData = {
                "firstname": this.props.user.currentUser.firstname,
                "lastname": this.props.user.currentUser.lastname,
                "username": this.props.user.currentUser.username,
                "email": this.props.user.currentUser.email
            };

            this.props.initialize(initData);

            this.setState ({
                files: this.props.user.picture
            })
        }
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
    
    async changeUserInformation(values) {
        var data = { values: values, path: this.state.files}
        let userID = this.props.user.currentUser._id;
        try {
            const res = await axios.put('http://localhost:8080/api/users/' + userID, data, withCredentials());
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
                case 403 :
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
        const { files } = this.state;
        const { t, i18n } = this.props;
        var path;
       
        const dropzoneStyle = {
            width: 110,
            height: 100,
            borderRadius: 20,
            border: "none",
            position: "relative"
          };

        if (files != null)
            path = files;
        else 
            path = require('../../assets/img/photo2.jpg');

        return (
            <div className="form">
                <div className="card">
                    <div className="card__side card__side--front">
                        <FormHeader 
                            heading1 = { t('EditInfo.title', { framework: "react-i18next" }) }
                            heading2 = { t('EditInfo.subtitle', { framework: "react-i18next" }) }
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