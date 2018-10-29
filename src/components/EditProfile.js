import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import izitoast from 'izitoast';
import validator from 'validator';
import tools from '../utils/tools.js';

class EditProfile extends Component {   
    constructor(props) {
        super(props);
        this.state = {
			messageSuccess : "",
			messageError: ""
        }
    }
    
    componentDidMount() {
        let initData = {
            "firstname": this.props.user.firstname,
            "lastname": this.props.user.lastname,
            "username": this.props.user.username,
            "email": this.props.user.email
        };
        this.props.initialize(initData);
    }
    
	renderField(field) {
		const { meta: { touched, error } } = field;

		return (
			<div className="card__form--field">
				<label className="card__form--input-label">{field.label}</label>
				<input
					className="card__form--input-input"
					type={field.type}
					placeholder={field.placeholder}
					{ ...field.input}
				/>
				<div className= "card__form--input-error">
					{touched ? error : ''}
				</div>
			</div>
		);
    }

    renderMessages() {
		if (this.state.messageSuccess) {
			return (
				<p className="card__form--input-success">{this.state.messageSuccess}</p>
			)
		}
		if (this.state.messageError) {
			return (
				<p className="card__form--input-error">{this.state.messageError}</p>	
			)
		}
    }
    
    changeUserInformation(values) {
        let message;
        let userID = this.props.user._id;
        axios.put('http://localhost:8080/api/users/' + userID, values)
            .catch((err) => {
                this.setState({ messageError: "Invalid information" })
            })
            .then((res) => {
                this.setState({ messageSuccess: res.data.message })
                this.props.history.push('/homepage');
            })
    }
        
    render() {
        const { handleSubmit } = this.props;  
        return (
            <div className="edit-profile">
                <div className="form">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__text">
                                <h4>
                                    Need to change your personal information?
                                </h4>
                                <h2 className="card__text-span">
                                    <span className="card__text-span--1">
                                        edit profile
                                    </span>
                                </h2>  
                            </div>
                            <div className="card__form">
                                <form className="card__form--input" onSubmit={handleSubmit(this.changeUserInformation.bind(this))}>
                                    <Field
                                        label="Firstname"
                                        name="firstname"
                                        type="text"
                                        component= {this.renderField}
                                    />
                                    <Field
                                        label="Lastname"
                                        name="lastname"
                                        type="text"
                                        component= {this.renderField}
                                    />
                                    <Field
                                        label="Username"
                                        name="username"
                                        type="text"
                                        component= {this.renderField}
                                    />
                                    <Field
                                        label="Email"
                                        name="email"
                                        type="email"
                                        component= {this.renderField}
                                    />
                                    <button type="submit" className="btn btn-primary btn-primary--pink">Sign Up</button>
                                    { this.renderMessages() }
                                </form>
                            </div>
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
    } else if (!tools.isEmail(values.email)) {
        errors.password = "Please enter a valid email address"
    }
    return errors;
}

function mapStateToProps(state) {
    return {
	    user: state.auth.currentUser
    };
}

const reduxFormEditProfile = reduxForm({
    validate,
    form: 'editProfile'
})(EditProfile);

export default connect(mapStateToProps, null)(reduxFormEditProfile);