import React, { Component } from 'react';
import ChangeUserInfo from './EditProfile/ChangeUserInfo';
import ChangePassword from './EditProfile/ChangePassword';

class EditProfile extends Component {   
    render() {
        return (
            <div className="edit-profile">
                <ChangeUserInfo />
                {/* <ChangePassword /> */}
            </div>
        );
    }
}

export default EditProfile;