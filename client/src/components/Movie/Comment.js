import React, { Component } from 'react';
import axios from 'axios';
import Cmt from './Cmt';

class Comment extends Component {

    state = {
        comment: "",
        comments: []
    }

    async componentDidMount() {
        console.log("IN DID MOUNT")
        const response = await axios.post("http://localhost:8080/api/comment/all", {
            imdbid: this.props.imdbid
        },{
                withCredentials: true
        }
    )

        console.log("COMMENTS", response.data)
        this.setState({comments: response.data})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("test")
        this.setState({comments: [...this.state.comments, {_id: "new", imdbid: this.props.imdbid, username: "Just added by me", message: this.state.comment, date: Date.now()}]})
        const response = await axios.post("http://localhost:8080/api/comment/add", {
            imdbid: this.props.imdbid,
            username: "test",
            message: this.state.comment
        }, {withCredentials: true})

        this.setState({comment: ""})
        console.log(response)
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render () {
        return (
            <div>
                <h2> Comments: </h2>
                {
                    this.state.comments.map(c => {
                        return (
                            <Cmt key={`${c.username}-${c.date}}`} username={c.username} message={c.message} date={c.date} />
                        )
                    })
                }
                <form onSubmit={this.handleSubmit}>
                    <textarea name="comment" onChange={this.handleChange} rows="4" cols="50" value={this.state.comment}> </textarea>
                    <button type="submit" className="li-video"> Add a comment </button>
                </form>
            </div>
        )
    }
}

export default Comment;