import React, { Component } from 'react';
import axios from 'axios';
import { withCredentials } from '../../utils/headers';

class Cmt extends Component {

    state = {
        src: ""
    }

    async componentDidMount() {
        const src = await axios.get(`http://localhost:8080/api/users/${this.props.userid}/${localStorage.getItem('xsrf')}` , withCredentials());
        this.setState({src: src.data.user.profile_picture})
    }

    render () {
        return (
                <div className="movie-comments--container-user">
                    <img alt="profile_picture" className="movie-comments--small-pic" src={this.state.src} onClick={() => this.props.goToProfile(this.props.userid)}></img>
                        <div>
                            <h4> <span className="movie-comments--comment-username" onClick={() => this.props.goToProfile(this.props.userid)}> {this.props.username} </span>
                                <span className="movie-comments--comment-date"> {isNaN(this.props.date) ? this.props.date.substring(0, 10) : 'Added just now'} </span>
                            </h4>
                        <div> {this.props.message} </div>
                    </div>
                
                
            </div>
        )
    }
}

export default Cmt;