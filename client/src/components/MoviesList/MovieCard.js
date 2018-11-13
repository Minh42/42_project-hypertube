import React, { Component } from 'react';
import Rating from './Rating';

class MovieCard extends Component {

    render() {
        const { movie, showMovieDetails } = this.props;
        return (
            <div key={movie._id} className="movies-list-container">
                <img src={movie._source.large_cover_image} alt={movie._source.title} className="movies-list-container__item" onClick={() => showMovieDetails(movie)}/>
                <div className="movies-list-container__info">
                    <div>{movie._source.title} ({movie._source.year})</div>
                    <Rating
                        rating={movie._source.rating} 
                    />
                </div>
            </div>
        );
    }
}

export default MovieCard;

















// console.log(this.props.movies)
// return (

//         {this.props.movies.map(movie => (

//             <img src={movie._source.large_cover_image} alt="Logo" className="movies-list__item" onClic=/>
//    
//         ))}
//     </div>