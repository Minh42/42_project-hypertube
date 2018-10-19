import React, { Component } from 'react';
import logo from '../assets/img/logo-white.png';
import { ReactComponent as Cycle } from '../assets/img/svg/cycle.svg';

class Test extends Component {   
    render() {
        return (
            <div className="container">
                <div className="landing">
                    {/* <img src={logo} alt="Logo" className="logo" />

                    <div className="user-nav__langage">
                        <span className="user-nav__langage-en">EN</span> 
                                | 
                        <span className="user-nav__langage-fr">FR</span>
                    </div> */}

                    <label for="toggle-1">Swap</label>
                    
                    <Cycle className="icon" fill='#fff'/>
                    <input type="checkbox" id="toggle-1"/>
             
                    <div className="card">
                        <div className="card__side card__side--front">
                            <form>
                                <label>Firstname</label>
                                <input type="text"/>
                                <label>Lastname</label>
                                <input type="text"/>
                            </form>
                        </div>
                        <div className="card__side card__side--back">
                            <form>
                                <label>Username</label>
                                <input type="text"/>
                                <label>Password</label>
                                <input type="text"/>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Test;