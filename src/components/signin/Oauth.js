import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signInActionOauth } from '../../reducers/reducer_auth';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as FortyTwo} from '../../assets/img/svg/42_logo.svg';

class Oauth extends Component {  
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(OauthStrategy) {
        this.props.signInActionOauth(OauthStrategy, this.props.history);
        // window.location.href = 'http://localhost:8080/api/auth/' + OauthStrategy;
    }

    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon" fill='#777' onClick={() => this.onSubmit('facebook')}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={() => this.onSubmit('twitter')}/>
                <Google className="card__OAuth--icon" fill='#777' onClick={() => this.onSubmit('google')}/>
                <LinkedIn className="card__OAuth--icon" fill='#777' onClick={() => this.onSubmit('linkedin')}/>
                <Github className="card__OAuth--icon" fill='#777' onClick={() => this.onSubmit('github')}/>
                <FortyTwo className="card__OAuth--icon42" fill='#777' onClick={() => this.onSubmit('fortytwo')}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInActionOauth : signInActionOauth}, dispatch);
} 

export default withRouter(connect(null, mapDispatchToProps)(Oauth));