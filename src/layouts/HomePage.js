import React, { Component } from 'react';
import MoviesList from '../components/MoviesList';

class HomePage extends Component {   
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <MoviesList />
        );
    }
}

export default HomePage;