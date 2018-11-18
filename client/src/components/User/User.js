import React, { Component } from 'react';
import axios from 'axios';
import { withCredentials } from '../../utils/headers';
import Dropzone from 'react-dropzone'
import { Field, reduxForm } from 'redux-form';
import RenderField from '../Form/RenderField';
import FormHeader from '../Form/FormHeader';
import { translate } from 'react-i18next';

class User extends Component {

    state = {
        username: "",
        firstname: "",
        lastname: "",
        src: ""
    }

    async componentDidMount() {
        const result = await axios.get(`http://localhost:8080/api/users/${this.props.match.params.id}/${localStorage.getItem('xsrf')}`, withCredentials());
        console.log("RES", result)
        const src = await axios.post(`http://localhost:8080/api/picture/`, {id: this.props.match.params.id} , withCredentials());
        this.setState({username: result.data.user.currentUser.username, firstname: result.data.user.currentUser.firstname, lastname: result.data.user.currentUser.lastname, src: src.data.path})
    }

    render () {
        const { t, i18n } = this.props;

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
                            heading1 = { t('User.profil', { framework: "react-i18next" }) }
                        />
                        <div className="card__form">
                        <div className="card__form--picture">
                            <div className="card__form--picture-block">
                                <img className="user-picture" src={this.state.src} alt="img"/>
                            </div>
                        </div>
                            <div>
                                <h4 className="user-label">{ t('EditInfo.username', { framework: "react-i18next" }) } : </h4> <p className="user-info">{this.state.username}</p>
                                <h4 className="user-label">{ t('EditInfo.lastname', { framework: "react-i18next" }) } : </h4> <p className="user-info">{this.state.firstname}</p>
                                <h4 className="user-label">{ t('EditInfo.firstname', { framework: "react-i18next" }) } : </h4> <p className="user-info">{this.state.lastname}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default translate('common') (User);