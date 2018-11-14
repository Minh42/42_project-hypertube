import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterRange from './MoviesList/FilterRange';
import SortBy from './MoviesList/SortBy';
import FiltersGenders from './MoviesList/FiltersChekbox';
import MovieCard from './MoviesList/MovieCard';
import { getFilterMovies } from '../selectors/index';
import { bindActionCreators } from 'redux';
import { initMoviesAction } from '../reducers/reducer_search';
import { selectMovie } from '../reducers/reducer_movies';
  
class MoviesList extends Component {

    componentDidMount() {
        console.log('here1')
        this.props.initMoviesAction();
    }

    showMovieDetails(movie) {
        this.props.selectMovie(movie, this.props.history);
    }

    renderMovies() {
        console.log(this.props)
        if (this.props.movies != null) {
            const allMovies = this.props.movies.map((movie, i) => (
                <MovieCard
                    key={i}
                    movie={movie}
                    showMovieDetails={this.showMovieDetails.bind(this)}
                />
            ));
            return (
                <div className="movies-list">
                    {allMovies} 
                </div>
            );     
        }
    }

    renderSortContainer() {
        if (this.props.movies) {
            if (this.props.movies.length !== null) {
                return (
                    <div className="movies-filters__container">
                        <span>{this.props.movies.length} results found</span>
                        <SortBy />
                    </div>
                )
            } else {
                return null;
            }
        }
    }

    render() {
        console.log(this.props.movies)
        return (
            <div className="movies-search">
                <div className="movies-filters">
                    {this.renderSortContainer()}
                    <FilterRange />
                    <FiltersGenders />
                </div>
                {this.renderMovies()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: getFilterMovies(state)
    };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ 
        initMoviesAction : initMoviesAction,
        selectMovie: selectMovie
    }, dispatch);
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList));