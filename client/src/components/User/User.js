import React, { Component } from 'react';
import axios from 'axios';
import { withCredentials } from '../../utils/headers';

class User extends Component {

    state = {
        username: "",
        firstname: "",
        lastname: "",
        src: ""
    }

    async componentDidMount() {
        const result = await axios.get(`http://localhost:8080/api/users/${this.props.match.params.id}`, withCredentials());
        const src = await axios.post(`http://localhost:8080/api/picture/`, {id: this.props.match.params.id} , withCredentials());
        this.setState({username: result.data.user.username, firstname: result.data.user.firstname, lastname: result.data.user.lastname, src: src.data.path})
    }

    render () {
        return (
            <div className="user-container">
                <div className="user-card">
                    <img className="user-picture" src={this.state.src} ></img>
                    <div> <span className="bold"> User name: </span> {this.state.username} </div>
                    <div> <span className="bold"> First name: </span> {this.state.firstname} </div>
                    <div> <span className="bold"> Last name: </span> {this.state.lastname} </div>
                </div>
            </div>
        )
    }
}

export default User;