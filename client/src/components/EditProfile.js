import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangeUserInfo from './EditProfile/ChangeUserInfo';
import ChangePassword from './EditProfile/ChangePassword';

class EditProfile extends Component {
    componentDidMount() {
        if (this.props.match.params.id && this.props.user) {
            if (this.props.match.params.id !== this.props.user._id) {
                this.props.history.push('/homepage');
            }
        } else {
            this.props.history.push('/homepage');
        }
    }
    
    render() {
        return (
            <div className="edit-profile">
                <ChangeUserInfo />
                <ChangePassword />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.currentUser
    };
}

export default connect(mapStateToProps, null)(EditProfile);