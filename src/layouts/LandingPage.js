import React, { Component } from 'react';
import { ReactComponent as Cycle} from '../assets/img/svg/cycle.svg';
import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';

class LandingPage extends Component {   
    render() {
        return (
            <div className="landing">
                <div className="landing__langage">
                    <span className="landing__langage--en">EN</span> 
                        | 
                    <span className="landing__langage--fr">FR</span>
                </div>
    
                <div className="landing__heading">
                    <a>Hypertube</a>
                </div>
                <div className="auth">
                    <label className="toggle" htmlFor="toggle-1">Swap</label>
                    <Cycle className="icon" fill='#fff'/>
                    <input type="checkbox" id="toggle-1"/>
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__text">
                                <h4>
                                    Already client? choose your movie
                                </h4>
                                <h2 className="card__text-span">
                                    <span className="card__text-span--1">
                                        sign in now
                                    </span>
                                </h2>  
                            </div>
                            <div className="card__form">
                                <form className="card__form--input">
                                    <label className="card__form--input-label">Email</label>
                                    <input className="card__form--input-input" type="email" placeholder=""></input>
                                    
                                    <label className="card__form--input-label">Password</label>
                                    <input className="card__form--input-input" type="password" placeholder="******"></input>

                                    <button className="btn btn-primary btn-primary--pink" type="submit">Sign In</button>
                                </form>
                                {/* <div className="card__form-forgot">
                                        Forgot password?
                                </div> */}
                            </div>
                            <div className="card__newClient">
                                <span>New client</span>
                                <Chevron className="icon" fill='rgb(216, 3, 81)'/>
                            </div>
                        </div>
                        <div className="card__side card__side--back">
                            <div className="card__text">
                                <h4>
                                    You want to see our film's selection
                                </h4>
                                <h2 className="card__text-span">
                                    <span className="card__text-span--1">
                                        sign up now
                                    </span> 
                                </h2>  
                            </div>
                            <div className="card__form">
                                <form className="card__form--input">
                                    <label className="card__form--input-label">Firstname</label>
                                    <input className="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label className="card__form--input-label">Lastname</label>
                                    <input className="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label className="card__form--input-label">Username</label>
                                    <input className="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label className="card__form--input-label">Email</label>
                                    <input className="card__form--input-input" type="email" placeholder=""></input>
                                    
                                    <label className="card__form--input-label">Password</label>
                                    <input className="card__form--input-input" type="password" placeholder="******"></input>

                                    <button className="btn btn-primary btn-primary--pink" type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

export default LandingPage;