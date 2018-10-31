import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import keys from '../../../server/db/config/keys';

class PopUp extends Component {  
    constructor(props) {
        super(props);
        // STEP 1: create a container <div>
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    render() {
        // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
        return ReactDOM.createPortal(this.props.children, this.containerEl);
      }
    
    componentDidMount() {
        const { OauthStrategy } = this.props;
        const url = 'http://localhost:8080/api/auth/' + OauthStrategy;

        // STEP 3: open a new browser window and store a reference to it
        this.externalWindow = window.open(url, OauthStrategy, 'width=600,height=400,left=200,top=200');

        // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
        this.externalWindow.document.body.appendChild(this.containerEl);

    }
    
    componentWillUnmount() {
        // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
        // So we tidy up by closing the window
        this.externalWindow.close();
    }
}

export default PopUp;