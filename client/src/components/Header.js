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
            file: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this); 
    }

    async componentDidMount() {
        console.log("USER", this.props.user)
        if (this.props.user) {
            const res = await axios.post('http://localhost:8080/api/picture/', {'id': this.props.user._id}, withCredentials())
            if (res) {
                this.setState ({
                    file: res.data.path
                })
            }
        }
        console.log("USER", this.props.user)
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
                            <span className="user-nav__user-name">Minh</span>
                        </div>
                        <div className="user-nav__signout">
                            <button className="btn btn-secondary" onClick={this.onSubmit}>
                                <span className="btn btn-secondary__icon">
                                    <Login fill='#eb2f64'/>
                                </span>
                                    { t('SignOut', { framework: "react-i18next" }) }
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