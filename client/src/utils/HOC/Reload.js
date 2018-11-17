import React, { Component } from 'react';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

class Reload extends Component {

    constructor(props){
        super(props);
        this.check();   
    }

    check = async () => {
        const xsrf = localStorage.getItem('xsrf');
        if (xsrf) {
            setAuthorizationToken(xsrf);
        }
    } 

    render(){
        return(
            <div>{this.props.children}</div>
        )
    }

}

export default Reload;