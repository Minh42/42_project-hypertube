import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotFoundPoster from '../../assets/img/not-found-poster.jpg';
import Rating from '../MoviesList/Rating';
import { convertMinsToHrsMins } from '../../utils/tools';

class LeftPanel extends Component {

    renderImage(movie) {
        if (movie._source.image !== "N/A") {
            return (
                <img src={movie._source.image} alt={movie._source.title} className="left-panel__movie-poster"/>
            )
        } else {
            return (
                <img src={NotFoundPoster} alt={movie._source.title} className="left-panel__movie-poster"/>
            )
        }
    }

    renderBasicInfo(movie) {
        if (movie._source.year) {
            var year = movie._source.year
            if (movie._source.year.length > 4)
                year = movie._source.year.substring(0,4);
            if (movie._source.title !== "N/A" && movie._source.year !== 'N/A') {
                return (
                    <div className="left-panel__movie-title">{movie._source.title} ({year})</div>
                )
            } else if (movie._source.title === "N/A" && movie._source.year !== 'N/A') {
                return (
                    <div className="left-panel__movie-title">Untitled ({year})</div>
                )
            } else if (movie._source.title !== 'N/A' && movie._source.year === 'N/A') {
                return (
                    <div className="left-panel__movie-title">{movie._source.title} (Unknown)</div>
                )
            } else {
                return (
                    <div className="left-panel__movie-title">Untitled (Unknown)</div>
                )
            }
        }
    }

    renderRuntime(movie) {
        const min = movie._source.runtime.split(' ');
        const duration = convertMinsToHrsMins(parseInt(min[0]));
        if (movie._source.runtime !== "N/A") {
            return (
                <div className="left-panel__movie-runtime">
                {duration}
                </div>
            )
        } else {
            return null;
        }
    }

    renderRating(movie) {
        if (movie._source.imdb_rating !== "N/A") {
            return (
                <div className="left-panel__movie-rating">
                    <Rating
                        rating={movie._source.imdb_rating} 
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    renderGenres(movie) {
        if (movie._source.genres !== 'N/A') {
            return (
                <div className="left-panel__movie-genres">
                    {movie._source.genres}
                </div> 
            )
        } else {
            return (
                <div className="left-panel__movie-genres">
                    Unknown
                </div> 
            )
        }
    }

    renderDirector(movie) {
        if (movie._source.director !== 'N/A') {
            return (
                <div className="left-panel__movie-director">
                    Director: {movie._source.director}
                </div>
            ) 
        } else {
            return (
                <div className="left-panel__movie-director">
                    Director: Unknown
                </div> 
            )
        }
    }


    renderWriter(movie) {
        if (movie._source.writer !== 'N/A') {
            return (
                <div className="left-panel__movie-director">
                    Writer:  {movie._source.writer}
                </div>
            ) 
        } else {
            return (
                <div className="left-panel__movie-director">
                    Writer:  Unknown
                </div> 
            )
        }
    }

    renderActor(movie) {
        if (movie._source.actor !== 'N/A') {
            return (
                <div className="left-panel__movie-director">
                    Actor:  {movie._source.actors}
                </div>
            )
        } else {
            return (
                <div className="left-panel__movie-director">
                    Actor:  Unknown
                </div>
            )
        }
    }

    renderSypnosis(movie) {
        if (movie._source.sypnosis !== 'N/A') {
            return (
                <div className="left-panel__movie-description">
                    {movie._source.sypnosis}
                </div>
            )
        } else {
            return (
                <div className="left-panel__movie-description">
                    No description
                </div>
            )
        }
    }

    render() {
        if (this.props.selectedMovie) {
            const movie = this.props.selectedMovie;
            return (
                <div className="left-panel">
                    {this.renderImage(movie)}

                    <div className="left-panel__movie-information">
                        {this.renderBasicInfo(movie)}
                        {this.renderRuntime(movie)}
                        {this.renderGenres(movie)}
                        {this.renderRating(movie)}
                        {this.renderDirector(movie)}
                        {this.renderWriter(movie)}
                        {this.renderActor(movie)}
                        {this.renderSypnosis(movie)}
                    </div>

 
                </div>
            );

        } else {
            return (
                <div></div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        selectedMovie: state.movies.selectedMovie
    };
}

export default connect(mapStateToProps, null)(LeftPanel);



