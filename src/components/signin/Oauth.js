import React, { Component } from 'react';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as School} from '../../assets/img/svg/42_logo.svg';


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
    
    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777' onClick={this.onSubmitFacebook}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={this.onSubmitTwitter}/>
                <Google className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGoogle}/>
                <LinkedIn className="card__OAuth--icon" fill='#777'/>
                <Github className="card__OAuth--icon" fill='#777'/>
                <School className="card__OAuth--icon42" fill='#777'/>
            </div>
        );
    }
}

export default Oauth;