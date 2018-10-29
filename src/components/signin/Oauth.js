import React, { Component } from 'react';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as FortyTwo} from '../../assets/img/svg/42_logo.svg';

class Oauth extends Component {  
    constructor(props) {
        super(props);
        this.signInOauth = this.signInOauth.bind(this);
    }

    signInOauth(OauthStrategy) {
        window.location.href = 'http://localhost:8080/api/auth/' + OauthStrategy;
    }

    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777' onClick={() => this.signInOauth('facebook')}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={() => this.signInOauth('twitter')}/>
                <Google className="card__OAuth--icon" fill='#777' onClick={() => this.signInOauth('google')}/>
                <LinkedIn className="card__OAuth--icon" fill='#777' onClick={() => this.signInOauth('linkedin')}/>
                <Github className="card__OAuth--icon" fill='#777' onClick={() => this.signInOauth('github')}/>
                <FortyTwo className="card__OAuth--icon42" fill='#777' onClick={() => this.signInOauth('fortytwo')}/>
            </div>
        );
    }
}

export default Oauth;