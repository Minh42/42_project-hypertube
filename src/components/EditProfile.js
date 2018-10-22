import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class EditProfile extends Component {   
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // componentDidMount() {
    //     let initData = {
    //         "firstname": this.props.user.firstname,
    //         "lastname": this.props.user.lastname,
    //         "username": this.props.user.username,
    //         "email": this.props.user.email,
    //         "password": this.props.user.password,
    //     };
    //     this.props.initialize(initData);
    // }
    
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className= `input ${touched && error ? 'is-danger' : ''}`;

		return (
			<div className="card__form--field">
				<label className={field.className1}>{field.label}</label>
				<input
					className={field.className2}
					type={field.type}
					placeholder={field.placeholder}
					{ ...field.input}
				/>
				<div className= "help is-danger">
					{touched ? error : ''}
				</div>
			</div>
		);
    }
    
    handleSubmit() {


    }
    
    render() {
        return (
            <div className="edit-profile">
                <div className="form">
                    <div className="card">
                        <div className="card__side card__side--front">

                            <div className="card__text">
                                <h4>
                                    Need to change your information?
                                </h4>
                                <h2 className="card__text-span">
                                    <span className="card__text-span--1">
                                        edit profile
                                    </span>
                                </h2>  
                            </div>

                            <div className="card__form">
                                <form className="card__form--input" onSubmit={this.handleSubmit}>
                                    <Field
                                        className1="card__form--input-label"
                                        className2="card__form--input-input"
                                        label="Firstname"
                                        name="firstName"
                                        type="text"
                                        component= {this.renderField}
                                        placeholder=""
                                    />
                                    <Field
                                        className1="card__form--input-label"
                                        className2="card__form--input-input"
                                        label="Lastname"
                                        name="lastName"
                                        type="text"
                                        component= {this.renderField}
                                        placeholder=""
                                    />
                                    <Field
                                        className1="card__form--input-label"
                                        className2="card__form--input-input"
                                        label="Username"
                                        name="login"
                                        type="text"
                                        component= {this.renderField}
                                        placeholder=""
                                    />
                                    <Field
                                        className1="card__form--input-label"
                                        className2="card__form--input-input"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        component= {this.renderField}
                                        placeholder=""
                                    />
                                    <Field
                                        className1="card__form--input-label"
                                        className2="card__form--input-input"
                                        label="New Password"
                                        name="password"
                                        type="password"
                                        placeholder=""
                                        component={this.renderField}
                                    />
                                    <button className="btn btn-primary btn-primary--pink" type="submit">Submit</button>
                                    {/* {this.errorMessage()} */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const reduxFormEditProfile = reduxForm({
    // validate,
    form: 'editProfile'
})(EditProfile);

export default connect(null, null)(reduxFormEditProfile);