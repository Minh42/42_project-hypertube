import React, { Component } from 'react';
import MoviesList from '../components/MoviesList';
import { connect } from 'react-redux';

class HomePage extends Component {
    render() {
        return (
            <MoviesList />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { 
        state: state,
        cookies: ownProps.cookies
    };
}

export default connect(mapStateToProps, null)(HomePage);