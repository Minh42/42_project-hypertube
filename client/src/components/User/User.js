import React, { Component } from 'react';
import axios from 'axios';
import { withCredentials } from '../../utils/headers';
import FormHeader from '../Form/FormHeader';
import { withNamespaces } from 'react-i18next';

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
        this.setState({username: result.data.user.username, firstname: result.data.user.firstname, lastname: result.data.user.lastname, src: result.data.user.profile_picture})
    }

    render () {

        const { t, } = this.props;

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
                            <div className="card__form--input">
                                <div className="card__form--field">
                                    <label className="card__form--input-label">{ t('EditInfo.username', { framework: "react-i18next" }) } :</label>
                                    <input className="card__form--input-input" type="text" readOnly value={this.state.username}/>
                                </div>
                                <div className="card__form--field">
                                    <label className="card__form--input-label">{ t('EditInfo.firstname', { framework: "react-i18next" }) } : </label>
                                    <input className="card__form--input-input" type="text" readOnly value={this.state.firstname}/>
                                </div>
                                <div className="card__form--field">
                                    <label className="card__form--input-label">{ t('EditInfo.lastname', { framework: "react-i18next" }) } : </label>
                                    <input className="card__form--input-input" type="text" readOnly value={this.state.lastname}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withNamespaces('common') (User);