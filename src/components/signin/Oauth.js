import React, { Component } from 'react';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as School} from '../../assets/img/svg/42_logo.svg';


class Oauth extends Component {  
    
    // onSubmitGoogle() {
    //     location.href = "api/auth/google";
    // }
    
    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777'/>
                <Twitter className="card__OAuth--icon" fill='#777'/>
                <Google className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGoogle}/>
                <LinkedIn className="card__OAuth--icon" fill='#777'/>
                <Github className="card__OAuth--icon" fill='#777'/>
                <School className="card__OAuth--icon42" fill='#777'/>
            </div>
        );
    }
}

export default Oauth;