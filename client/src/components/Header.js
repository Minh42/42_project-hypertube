import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutAction } from '../reducers/reducer_auth';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import logo from '../assets/img/logo-white.png';
import user from '../assets/img/user.jpg';
import { ReactComponent as Glass} from '../assets/img/svg/magnifying-glass.svg';
import { ReactComponent as Login} from '../assets/img/svg/login.svg';

import { translate, Trans } from 'react-i18next';

class Header extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.editProfile = this.editProfile.bind(this);     
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

        if (this.props.isAuthenticated) {
            return (
                <header className="header">
                    <img src={logo} alt="Logo" className="logo" />
       
                    <form action="#" className="search">
                        <input type="text" className="search__input" placeholder="Search movies"/>
                        <button className="search__button">
                            <Glass fill='#999'/>
                        </button>
                    </form>
       
                    <nav className="user-nav">
                        <div className="user-nav__langage">
                            <span className="user-nav__langage-en" onClick={() => i18n.changeLanguage('en')}>EN</span> 
                                | 
                            <span className="user-nav__langage-fr" onClick={() => i18n.changeLanguage('fr')}>FR</span>
                        </div>
                        <div className="user-nav__user" onClick={this.editProfile}>
                            <img src={user} alt="user" className="user-nav__user-photo"/>
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