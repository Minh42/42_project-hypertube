import React, { Component } from 'react';
import Rating from './Rating';
import NotFoundPoster from '../../assets/img/not-found-poster.jpg';

class MovieCard extends Component {

    renderBasicInfo(movie) {
        if (movie._source.title !== "N/A" && movie._source.year !== 'N/A') {
            return (
                <div>{movie._source.title} ({movie._source.year})</div>
            )
        } else if (movie._source.title === "N/A" && movie._source.year !== 'N/A') {
            return (
                <div>Untitled ({movie._source.year})</div>
            )
        } else if (movie._source.title !== 'N/A' && movie._source.year === 'N/A') {
            return (
                <div>{movie._source.title} (Unknown)</div>
            )
        } else {
            return (
                <div>Untitled (Unknown)</div>
            )
        }
    }

    renderImage(movie, showMovieDetails) {
        if (movie._source.image !== "N/A" && movie._source.title) {
            return (
                <img src={movie._source.image} alt={movie._source.title} className="movies-list-container__item" onClick={() => showMovieDetails(movie)}/>
            )
        } else if (movie._source.image === "N/A") {
            return (
                <img src={NotFoundPoster} alt={movie._source.title} className="movies-list-container__item" onClick={() => showMovieDetails(movie)}/>
            )
        }
    }

    renderRating(movie) {
        if (movie._source.imdb_rating !== "N/A") {
            return (
                <Rating
                    rating={movie._source.imdb_rating} 
                />
            )
        } else {
            return null;
        }
    }

    render() {
        const { movie, showMovieDetails } = this.props;
        return (
            <div key={movie._source.id} className="movies-list-container">
                {this.renderImage(movie, showMovieDetails)}
                <div className="movies-list-container__info">
                    {this.renderBasicInfo(movie)}
                    {/* {this.renderRating(movie)} */}
                </div>
            </div>
        );
    }
}

export default MovieCard;