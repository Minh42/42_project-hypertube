import React, { Component } from 'react';
import PopUp from './PopUp';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as FortyTwo} from '../../assets/img/svg/42_logo.svg';

class Oauth extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            OauthStrategy: null,
            showOauthWindow: false
        };
        this.handleOauth = this.handleOauth.bind(this);
      }

    handleOauth(OauthStrategy) {
        this.setState(state => ({
            ...state,
            OauthStrategy: OauthStrategy,
            showOauthWindow: !state.showOauthWindow
        }));
    }

    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777' onClick={() => this.handleOauth('facebook')}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={() => this.handleOauth('twitter')}/>
                <Google className="card__OAuth--icon" fill='#777' onClick={() => this.handleOauth('google')}/>
                <LinkedIn className="card__OAuth--icon" fill='#777' onClick={() => this.handleOauth('linkedin')}/>
                <Github className="card__OAuth--icon" fill='#777' onClick={() => this.handleOauth('github')}/>
                <FortyTwo className="card__OAuth--icon42" fill='#777' onClick={() => this.handleOauth('fortytwo')}/>

                {this.state.showOauthWindow && (
                <PopUp OauthStrategy={this.state.OauthStrategy} externalWindow={this.externalWindow}>
                </PopUp>
                )}

            </div>
        );
    }
}

export default Oauth;