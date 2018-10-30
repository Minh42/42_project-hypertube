import React, { Component } from 'react';

class RenderMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
			messageSuccess : "",
			messageError: ""
        }
    }

    render() {
        if (this.state.messageSuccess) {
            return (
                <p className="card__form--input-success">{this.state.messageSuccess}</p>
            )
        }
        if (this.state.messageError) {
            return (
                <p className="card__form--input-error">{this.state.messageError}</p>	
            )
        }
    }
}

export default RenderMessages;