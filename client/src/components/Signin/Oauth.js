import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signInActionOauth } from '../../reducers/reducer_auth';
import queryString from 'query-string';
import axios from 'axios';
import izitoast from 'izitoast';
import { withCredentials } from '../../utils/headers';
import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as LinkedIn} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as FortyTwo} from '../../assets/img/svg/42_logo.svg';
import { withNamespaces } from 'react-i18next';

class Oauth extends Component {  
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { t } = this.props;
        if (this.props.location.search) {
            let message;
            let xsrfToken = queryString.parse(this.props.location.search).xsrfToken;
            let userID = queryString.parse(this.props.location.search).userID;
            if (xsrfToken && userID) {
                axios.get('http://localhost:8080/api/users/' + userID + '/' + xsrfToken, withCredentials())
                    .catch((err) => {
                        switch (err.response.status) {
                            case 404 :
                                message = t('Izitoast.errorOauth', { framework: "react-i18next" })
                                break;
                            case 500:
                                message = t('Izitoast.error500', { framework: "react-i18next" })
                                break;
                            default: 
                                break;
                        }
                        izitoast.error({
                            message: message,
                            position: 'topRight'
                        });
                    })
                    .then((res) => {
                        if (res) {
                            const user = res.data.user;
                            this.props.signInActionOauth(xsrfToken, user, this.props.history)
                        }
                    })
            }
        }
    }

    onSubmit(OauthStrategy) {
        window.location.href = 'http://localhost:8080/api/auth/' + OauthStrategy;
    }

    render() {
        return (
            <div className="card__OAuth">
                <Facebook className="card__OAuth--icon pointer" fill='#777' onClick={() => this.onSubmit('facebook')}/>
                <Twitter className="card__OAuth--icon pointer" fill='#777' onClick={() => this.onSubmit('twitter')}/>
                <Google className="card__OAuth--icon pointer" fill='#777' onClick={() => this.onSubmit('google')}/>
                <LinkedIn className="card__OAuth--icon pointer" fill='#777' onClick={() => this.onSubmit('linkedin')}/>
                <Github className="card__OAuth--icon pointer" fill='#777' onClick={() => this.onSubmit('github')}/>
                <FortyTwo className="card__OAuth--icon42 pointer" fill='#777' onClick={() => this.onSubmit('fortytwo')}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInActionOauth : signInActionOauth}, dispatch);
} 

export default withNamespaces('common')(withRouter(connect(null, mapDispatchToProps)(Oauth)));