import React, { Component } from 'react';
import logo from '../assets/img/logo-white.png';
import user from '../assets/img/user.jpg';

class Header extends Component {    
    render() {
        return (
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
   
                <form action="#" className="search">
                    <input type="text" className="search__input" placeholder="Search movies"/>
                    <button className="search__button">
                    <svg className="search__icon">
                        <use xlinkHref="assets/img/sprite.svg#icon-magnifying-glass"></use>
                    </svg>
                    </button>
                </form>

                <span className="custom-dropdown custom-dropdown--white">
                    <select className="custom-dropdown__select custom-dropdown__select--white">
                        <option>English (United States)</option>
                        <option>Français (France)</option>
                    </select>
                </span>

                <nav className="nav user-nav">
                    <div className="user-nav__user">
                        <img src={user} alt="User photo" className="user-nav__user-photo"/>
                        <span className="user-nav__user-name">Minh</span>
                    </div>
                    <div className="user-nav__signout">
                        <button className="btn btn-primary">Signout</button>
                    </div>
                </nav>

            </header>
        );
    }
}

export default Header;