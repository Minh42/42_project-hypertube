import React, { Component } from 'react';
import axios from 'axios';
import { withCredentials } from '../../utils/headers';

class Cmt extends Component {

    state = {
        src: ""
    }

    async componentDidMount() {
        const src = await axios.post(`http://localhost:8080/api/picture/`, {id: this.props.userid} , withCredentials());
        this.setState({src: src.data.path})
    }

    render () {
        return (
            <div className="movie-cmt">
                <div className="container-user">
                    <img className="small-pic" src={this.state.src} onClick={() => this.props.goToProfile(this.props.userid)}></img>
                    <div className="container-msg">
                            <h4> <span className="comment-username" onClick={() => this.props.goToProfile(this.props.userid)}> {this.props.username} </span>
                                <span className="comment-date"> {isNaN(this.props.date) ? this.props.date.substring(0, 10) : 'Added just now'} </span>
                            </h4>
                        <div className="message-content"> {this.props.message} </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default Cmt;