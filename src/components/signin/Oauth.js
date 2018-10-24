import React, { Component } from 'react';
import axios from 'axios';

import { ReactComponent as Facebook} from '../../assets/img/svg/facebook.svg';
import { ReactComponent as Twitter} from '../../assets/img/svg/twitter.svg';
import { ReactComponent as Linkedin} from '../../assets/img/svg/linkedin.svg';
import { ReactComponent as Google} from '../../assets/img/svg/google.svg';
import { ReactComponent as Github} from '../../assets/img/svg/github.svg';
import { ReactComponent as School} from '../../assets/img/svg/42_logo.svg';

class Oauth extends Component {  
    
    // onSubmitFacebook() {
    //     this.props.history.push("api/auth/facebook");
    // }

    // onSubmitTwitter() {
    //     this.props.history.push("api/auth/twitter");
    // }

    onSubmitGoogle() {
        axios.get('http://localhost:8080/api/auth/google').then((res) => {
            console.log(res.data)
        })
    }

    // onSubmitLinkedin() {
    //     this.props.history.push("api/auth/linkedin");
    // }
    
    // onSubmitGithub() {
    //     this.props.history.push("api/auth/github");
    // }

    // onSubmitSchool() {
    //     this.props.history.push("api/auth/school");
    // }

    render() {
        return (
            <div className="card__OAuth">
                {/* <Facebook className="card__OAuth--icon" fill='#777' onClick={this.onSubmitFacebook}/>
                <Twitter className="card__OAuth--icon" fill='#777' onClick={this.onSubmitTwitter}/> */}
                <Google className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGoogle}/>
                {/* <Linkedin className="card__OAuth--icon" fill='#777' onClick={this.onSubmitLinkedin}/>
                <Github className="card__OAuth--icon" fill='#777' onClick={this.onSubmitGithub}/>
                <School className="card__OAuth--icon42" fill='#777' onClick={this.onSubmitSchool}/> */}
            </div>
        );
    }
}

export default Oauth;