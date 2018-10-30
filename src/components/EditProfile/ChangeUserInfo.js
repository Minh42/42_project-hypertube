import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import axios from 'axios';
import izitoast from 'izitoast';
import validator from 'validator';

class ChangeUserInfo extends Component {
    componentDidMount() {
        let initData = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "username": this.props.user.username,
            "email": this.props.user.email
        };
        this.props.initialize(initData);
    }
    
    changeUserInformation(values) {
        let message;
        let userID = this.props.user._id;
        axios.put('http://localhost:8080/api/users/' + userID, values)
            .catch((err) => {
                izitoast.error({
                    message: "Oops, something went wrong!",
                    position: 'topRight'
                });
            })
            .then((res) => {
                izitoast.success({
                    message: res.data.message,
                    position: 'topRight'
                });
                this.props.history.push('/homepage');
            })
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="form">
                <div className="card">
                    <div className="card__side card__side--front">
                        <FormHeader 
                            heading1 = "Need to change your personal information?"
                            heading2 = "edit profile"
                        />
                        <div className="card__form">
                            <form className="card__form--input" onSubmit={handleSubmit(this.changeUserInformation.bind(this))}>
                                <Field
                                    label="Firstname"
                                    name="firstname"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label="Lastname"
                                    name="lastname"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label="Username"
                                    name="username"
                                    type="text"
                                    component= {RenderField}
                                />
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    component= {RenderField}
                                />
                                <button type="submit" className="btn btn-primary btn-primary--pink">Submit</button>
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

const reduxFormChangeUserInfo = reduxForm({
    validate,
    form: 'editProfile'
})(ChangeUserInfo);


export default withRouter(connect(mapStateToProps, null)(reduxFormChangeUserInfo));