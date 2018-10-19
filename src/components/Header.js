import React, { Component } from 'react';
import logo from '../assets/img/logo-white.png';
import user from '../assets/img/user.jpg';
import { ReactComponent as Glass} from '../assets/img/svg/magnifying-glass.svg';
import { ReactComponent as Login} from '../assets/img/svg/login.svg';

class Header extends Component {    
    render() {
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
                        <span className="user-nav__langage-en">EN</span> 
                            | 
                        <span className="user-nav__langage-fr">FR</span>
                    </div>
                    <div className="user-nav__user">
                        <img src={user} alt="user" className="user-nav__user-photo"/>
                        <span className="user-nav__user-name">Minh</span>
                    </div>
                    <div className="user-nav__signout">
                        <button className="btn btn-primary">
                            <span className="btn btn-primary__icon">
                                <Login fill='#eb2f64'/>
                            </span>
                                Signout
                        </button>
                    </div>
                </nav>

            </header>
        );
    }
}

export default Header;