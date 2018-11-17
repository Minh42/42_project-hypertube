import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutAction } from '../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import SearchBar from './Header/SearchBar';
import logo from '../assets/img/logo-white.png';
import user from '../assets/img/user.jpg';
import axios from 'axios';
import { ReactComponent as Login} from '../assets/img/svg/login.svg';
import { withCredentials } from '../utils/headers';
import { translate, Trans } from 'react-i18next';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this); 
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log(this.props.user)
        // if (this.props.user) {
        //     if (prevProps.user.currentUser && prevState.files === null) {
        //         this.setState ({
        //             files: this.props.user.picture
        //         })
        //     }
        // }
    }

    async componentDidMount() {
        if (this.props.user) {
            console.log(this.props.user)
            this.setState ({
                files: this.props.user.picture
            })
        }
    }

    editProfile() {
        if (this.props.user) {
            this.props.history.push('/profile/' + this.props.user._id)
        }
    }

    onSubmit () {
        this.props.signOutAction(this.props.history);
    }
    
    render() {
        console.log(this.props.user)
        const { t, i18n } = this.props;
        const { files } = this.state;
        var path;

        if (files != null)
            path = files;
        else 
            path = require('../assets/img/photo2.jpg');

        if (this.props.isAuthenticated) {
            return (
                <header className="header">
                    <a href="/homepage"><img src={logo} alt="Logo" className="logo"></img></a>

                    <SearchBar />
                  
                    <nav className="user-nav">
                        <div className="user-nav__langage">
                            <span className="user-nav__langage-en" onClick={() => i18n.changeLanguage('en')}>EN</span> 
                                | 
                            <span className="user-nav__langage-fr" onClick={() => i18n.changeLanguage('fr')}>FR</span>
                        </div>
                        <div className="user-nav__user" onClick={this.editProfile}>
                            <img src={path} alt="user" className="user-nav__user-photo"/>
                            <span className="user-nav__user-name">{this.props.user.username}</span>
                        </div>
                        <div className="user-nav__signout">
                            <button className="btn btn-secondary" onClick={this.onSubmit}>
                                <span className="btn btn-secondary__icon">
                                    <Login fill='rgba(216, 3, 81, 0.733)'/>
                                </span>
                                    { t('Header.signOut', { framework: "react-i18next" }) }
                            </button>
                        </div>
                    </nav>
                </header>
            );
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated,
        user: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signOutAction : signOutAction}, dispatch);
} 

export default translate('common')(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)));