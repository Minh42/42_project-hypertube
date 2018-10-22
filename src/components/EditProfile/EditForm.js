import React, { Component } from 'react';

class EditForm extends Component {   
    render() {
        return (
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
                                />
                                <Field
                                    className1="card__form--input-label"
                                    className2="card__form--input-input"
                                    label="Lastname"
                                    name="lastName"
                                    type="text"
                                    component= {this.renderField}
                                />
                                <Field
                                    className1="card__form--input-label"
                                    className2="card__form--input-input"
                                    label="Username"
                                    name="login"
                                    type="text"
                                    component= {this.renderField}
                                />
                                <Field
                                    className1="card__form--input-label"
                                    className2="card__form--input-input"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    component= {this.renderField}
                                />
                                <Field
                                    className1="card__form--input-label"
                                    className2="card__form--input-input"
                                    label="New Password"
                                    name="password"
                                    type="password"
                                    component={this.renderField}
                                />
                                <button className="btn btn-primary btn-primary--pink" type="submit">Submit</button>
                                {/* {this.errorMessage()} */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditForm;