import React, { Component } from 'react';
import axios from 'axios';
import Cmt from './Cmt';
import { withCredentials } from '../../utils/headers';
import { withNamespaces } from 'react-i18next';

class Comment extends Component {

    state = {
        comment: "",
        comments: []
    }

    async componentDidMount() {
        const response = await axios.post("http://localhost:8080/api/comment/all", {
            imdbid: this.props.imdbid
        }, withCredentials())
        this.setState({comments: response.data})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.comment === "") {
            this.props.isTyping(false);
            return ;
        }
        this.setState({comments: [...this.state.comments, {id: this.props.userid, imdbid: this.props.imdbid, username: "Just added by me", message: this.state.comment, date: Date.now()}]})
        await axios.post("http://localhost:8080/api/comment/add", {
            imdbid: this.props.imdbid,
            username: "test",
            message: this.state.comment
        },withCredentials())

        this.setState({comment: ""})
        this.props.isTyping(false);
    }

    handleChange = async (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.props.isTyping(true);
    }

    goToProfile = (userid) => {
        this.props.history.push(`/user/${userid}`)
    }

    render () {

        const { t } = this.props;

        return (
            <div className="movie-comments__box">
                <h3 className="movie-comments__header"> { t('Movie.comment', { framework: "react-i18next" }) }: </h3>
                {
                    this.state.comments.map(c => {
                        return (
                            <Cmt key={`${c.username}-${c.date}}`} goToProfile={this.goToProfile} userid={c.id} username={c.username} message={c.message} date={c.date} />
                        )
                    })
                }
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea className="movie-comments-area" name="comment" onChange={this.handleChange} rows="4" cols="50" value={this.state.comment}> </textarea>
                    </div>
                    <div>
                        <button type="submit" className="add-comment"> { t('Movie.add', { framework: "react-i18next" }) } </button>
                    </div>                
                </form>
            </div>
        )
    }
}

export default withNamespaces('common') (Comment);