import React, { Component } from 'react';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as FortyTwo} from '../../assets/img/svg/42_logo.svg';


class Oauth extends Component {  
    
    onSubmitFacebook() {
        window.location.href = "http://localhost:8080/api/auth/facebook";
    }

    onSubmitTwitter() {
        window.location.href = "http://localhost:8080/api/auth/twitter";
    }

    onSubmitGoogle() {
        window.location.href = "http://localhost:8080/api/auth/google";
    }

    onSubmitLinkedin() {
        window.location.href = "http://localhost:8080/api/auth/linkedin";
    }

    onSubmitGithub() {
        window.location.href = "http://localhost:8080/api/auth/github";
    }

    onSubmitFortyTwo() {
        window.location.href = "http://localhost:8080/api/auth/42";
    }
    
    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777' onClick={this.onSubmitFacebook}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={this.onSubmitTwitter}/>
                <Google className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGoogle}/>
                <LinkedIn className="card__OAuth--icon" fill='#777' onClick={this.onSubmitLinkedin}/>
                <Github className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGithub}/>
                <FortyTwo className="card__OAuth--icon42" fill='#777' onClick={this.onSubmitFortyTwo}/>
            </div>
        );
    }
}

export default Oauth;