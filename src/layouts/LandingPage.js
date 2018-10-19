import React, { Component } from 'react';
import { ReactComponent as Cycle} from '../assets/img/svg/cycle.svg';
import { ReactComponent as Chevron} from '../assets/img/svg/chevron-thin-down.svg';

class LandingPage extends Component {   
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <div className="container">
                <div class="language">
                 {/* <img src={logo} alt="Logo" className="logo" /> */}
                    <div className="user-nav__langage">
                        <span className="user-nav__langage-en">EN</span> 
                                | 
                        <span className="user-nav__langage-fr">FR</span>
                    </div>
                </div>
                <div class="title_website">
                    <a>Hypertube</a>
                </div>
                <div className="landing">
                    <label class="toggle" for="toggle-1">Swap</label>
                    <Cycle className="icon" fill='#fff'/>
                    <input type="checkbox" id="toggle-1"/>
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div class="card__text">
                                <h4>
                                    Already client? choose your movie
                                </h4>
                                <h2 class="card__text-span">
                                    <span class="card__text-span--2">
                                        sign in now
                                    </span>
                                </h2>  
                            </div>
                            <div class="card__form">
                                <form class="card__form--input">
                                    <label class="card__form--input-label">Email</label>
                                    <input class="card__form--input-input" type="email" placeholder=""></input>
                                    
                                    <label class="card__form--input-label">Password</label>
                                    <input class="card__form--input-input" type="password" placeholder="******"></input>

                                    <button class=" btn btn--white btn--animated" type="submit">Sign In</button>
                                </form>
                            </div>
                            <div class="card__newClient">
                                <span>New client</span>
                                <Chevron className="icon1" fill='rgb(216, 3, 81)'/>
                            </div>
                        </div>
                        <div className="card__side card__side--back card__side--back-1">
                            <div class="card__text">
                                <h4>
                                    You want to see our film's selection
                                </h4>
                                <h2 class="card__text-span">
                                    <span class="card__text-span--2">
                                        sign up now
                                    </span> 
                                </h2>  
                            </div>
                            <div class="card__form">
                                <form class="card__form--input">
                                    <label class="card__form--input-label">Firstname</label>
                                    <input class="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label class="card__form--input-label">Lastname</label>
                                    <input class="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label class="card__form--input-label">Username</label>
                                    <input class="card__form--input-input" type="text" placeholder=""></input>
                                    
                                    <label class="card__form--input-label">Email</label>
                                    <input class="card__form--input-input" type="email" placeholder=""></input>
                                    
                                    <label class="card__form--input-label">Password</label>
                                    <input class="card__form--input-input" type="password" placeholder="******"></input>

                                    <button class=" btn btn--white btn--animated" type="submit">Sign Up</button>
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