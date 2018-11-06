import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { Hits, SearchkitComponent, HitItemProps } from "searchkit";
import MovieHitsTable from './MoviesList/MovieHitsTable';
  
class MoviesList extends SearchkitComponent {     
    render() {
        return (
            // <div>
            //     <Hits hitsPerPage={50} sourceFilter={["title", "poster", "imdbId", "imdbRating"]} listComponent={MovieHitsTable}/>
            // </div>
            'Hello'

            // <div className="movies-list">
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            //     <div className="movies-list__container">
            //         <img src={movie} alt="Logo" className="movies-list__item" /> 
            //     </div>
            // </div>
        );
    }
}

export default MoviesList;