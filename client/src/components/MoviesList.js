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
        this.props.initMoviesAction();
    }

    showMovieDetails(movie) {
        this.props.selectMovie(movie, this.props.history);
    }

    renderMovies() {
        if (this.props.movies) {
            console.log(this.props.movies)
            return this.props.movies.map((movie, id) => {
                return (
                    <MovieCard
                        key={id}
                        movie={movie}
                        showMovieDetails={this.showMovieDetails.bind(this)}
                    />
                );
            })
        } else {
            return null;
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
        return (
            <div className="movies-search">
                <div className="movies-filters">
                    {this.renderSortContainer()}
                    <FilterRange />
                    <FiltersGenders />
                </div>
                <div className="movies-list">
                    {this.renderMovies()}
                </div>
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