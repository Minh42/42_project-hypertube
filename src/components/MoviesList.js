import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';

class MoviesList extends Component {    
    render() {
        return (
            <div className="movies-list">
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
                <div className="movies-list__container">
                    <img src={movie} alt="Logo" className="movies-list__item" /> 
                </div>
            </div>
        );
    }
}

export default MoviesList;