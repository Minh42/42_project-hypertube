import React, { Component } from 'react';
import EditForm from './EditProfile/EditForm';
import { connect } from 'react-redux';
import validator from 'validator';

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
                <EditForm 
                
                />
            </div>
        );
    }
}

function validate(values) {
    console.log(values);
}

function mapStateToProps(state) {
    return {
	  currentUser: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		editProfile: editProfile
	}, dispatch);
}

const reduxFormEditProfile = reduxForm({
    validate,
    form: 'editProfile'
})(EditProfile);

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormEditProfile);