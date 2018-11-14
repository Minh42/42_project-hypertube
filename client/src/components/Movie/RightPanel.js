import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFoundPoster from '../../assets/img/not-found-poster.jpg';

class RightPanel extends Component {

    render() {
        if (this.props.selectedMovie) {
            const movie = this.props.selectedMovie;
            if (movie._source.image !== "N/A") {
                return (
                    <div className="right-panel">
                        <img src={movie._source.image} alt={movie._source.title} className="right-panel__movie-poster"/> 
                    </div>
                );
            } else {
                return (
                    <div className="right-panel">
                        <img src={NotFoundPoster} alt={movie._source.title} className="right-panel__movie-poster"/> 
                    </div>
                );  
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        selectedMovie: state.movies.selectedMovie
    };
}

export default connect(mapStateToProps, null)(RightPanel);