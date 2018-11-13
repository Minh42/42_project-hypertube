import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesList from '../components/MoviesList';

class HomePage extends Component {
    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/');
        } else {
            console.log('do something')
        }
    }

    render() {
        return (
            <MoviesList />
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, null)(HomePage);