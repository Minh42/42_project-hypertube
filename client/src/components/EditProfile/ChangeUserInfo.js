import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import { signOutAction, AUTHENTICATED } from '../../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import izitoast from 'izitoast';
import validator from 'validator';
import Dropzone from 'react-dropzone'
import { withNamespaces } from 'react-i18next';
import { withCredentials } from '../../utils/headers';

class ChangeUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null 
        }
    }

    componentDidMount() {
        if (this.props.user) {
            const initData = {
                "firstname": this.props.user.firstname,
                "lastname": this.props.user.lastname,
                "username": this.props.user.username,
                "email": this.props.user.email
            };
            this.props.initialize(initData);
        }
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
                            message = t('Izitoast.error500', { framework: "react-i18next" })
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
    
    async changeUserInformation(values) {
        const { t } = this.props;
        var data = { values: values, path: this.state.files}
        let userID = this.props.user._id;
        let message;
        try {
            const res = await axios.put('http://localhost:8080/api/users/' + userID, data, withCredentials());
            if (res.data.message === "Your information was updated successfully")
                message = t('Izitoast.updateSuccess', { framework: "react-i18next" });
            this.props.dispatch({
                type: AUTHENTICATED,
                payload: res.data.user
            })
            izitoast.success({
                message: message,
                position: 'topRight'
            });
        } catch (err) {
            switch (err.response.status) {
                case 401 :
                    izitoast.error({
                        message: t('Izitoast.errorLogin', { framework: "react-i18next" }),
                        position: 'topRight'
                    });
                    this.props.signOutAction(this.props.history);
                    break;
                case 403 :
                    izitoast.error({
                        message: t('Izitoast.erroLogin', { framework: "react-i18next" }),
                        position: 'topRight'
                    });
                    this.props.signOutAction(this.props.history);
                    break;
                default: 
                    izitoast.error({
                        message: t('Izitoast.error500', { framework: "react-i18next" }),
                        position: 'topRight'
                    });
                    break;
            }
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { t } = this.props;
        let path;

        if (this.props.user) {
            if (this.props.user.profile_picture) {
                if (this.state.files !== null) {
                    path = this.state.files;
                }
                else {
                    path = this.props.user.profile_picture;
                }
            } 
        }   
  
        const dropzoneStyle = {
            width: 110,
            height: 100,
            borderRadius: 20,
            border: "none",
            position: "relative"
        };

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

function validate(values, props) {
    const { t } = props;
    const errors = {};
    if (!values.firstname) {
        errors.firstname = t('Validate.firstname', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.firstname, { min : 1, max : 15 })) {
        errors.firstname = t('Validate.length.firstname', { framework: "react-i18next" })
    } else if (!validator.isAlpha(values.firstname)) {
        errors.firstname = "Your firstname must contain only alphabetic characters"
    }

    if (!values.lastname) {
        errors.lastname = t('Validate.lastname', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.lastname, { min : 1, max : 15 })) {
        errors.lastname = t('Validate.length.lastname', { framework: "react-i18next" })
    } else if (!validator.isAlpha(values.lastname)) {
        errors.lastname = "Your lastname must contain only alphabetic characters"
    }

    if (!values.username) {
        errors.username = t('Validate.username', { framework: "react-i18next" })
    } else if (!validator.isByteLength(values.username, { min : 1, max : 15 })) {
        errors.username = t('Validate.length.username', { framework: "react-i18next" })
    } else if (!validator.isAlphanumeric(values.username)) {
        errors.username = t('Validate.other.username', { framework: "react-i18next" })
    }

    if (!values.email) {
        errors.email = t('Validate.email', { framework: "react-i18next" })
    } else if (!validator.isEmail(values.email, { allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain: false, domain_specific_validation: false })) {
        errors.email = t('Validate.other.email', { framework: "react-i18next" })
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

export default withNamespaces('common')(withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxFormChangeUserInfo)));