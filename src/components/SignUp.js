import React, { Component } from 'react';

class SignUp extends Component {   
    render() {
        return (
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
        )
    }
}

export default SignUp;