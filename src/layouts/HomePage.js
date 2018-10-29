import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signInActionOauth } from '../reducers/reducer_auth';
import MoviesList from '../components/MoviesList';

class HomePage extends Component {
    componentDidMount() {
        if (this.props.location.search) {
            let accessToken = queryString.parse(this.props.location.search).accessToken;
            this.props.signInActionOauth(accessToken, this.props.history);
        }
    }

    render() {
        return (
            <MoviesList />
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInActionOauth : signInActionOauth}, dispatch);
} 

export default withRouter(connect(null, mapDispatchToProps)(HomePage));