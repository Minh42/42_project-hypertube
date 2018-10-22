import React, { Component } from 'react';
import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';

import { ReactComponent as Facebook} from '../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../assets/img/svg/github.svg';
import { ReactComponent as School} from '../assets/img/svg/42_logo.svg';

class SignIn extends Component {   
    render() {
        return (
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
                    </div>
                    <div className="card__forgot">
                            Forgot password?
                    </div>
                    <div className="card__OAuth">
                        <Facebook className="card__OAuth--icon" fill='#777'/>
                        <Twitter className="card__OAuth--icon" fill='#777'/>
                        <Google className="card__OAuth--icon" fill='#777'/>
                        <LinkedIn className="card__OAuth--icon" fill='#777'/>
                        <Github className="card__OAuth--icon" fill='#777'/>
                        <School className="card__OAuth--icon42" fill='#777'/>
                    </div>
                    <div className="card__newClient">
                        <span>New client</span>
                        <Chevron className="icon" fill='rgb(216, 3, 81)'/>
                    </div>
                </div>
        )
    }
}

export default SignIn;