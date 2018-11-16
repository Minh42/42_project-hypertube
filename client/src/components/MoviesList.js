import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterRange from './MoviesList/FilterRange';
import SortBy from './MoviesList/SortBy';
import FiltersGenders from './MoviesList/FiltersChekbox';
import MovieCard from './MoviesList/MovieCard';
import { bindActionCreators } from 'redux';
import { initMoviesAction } from '../reducers/reducer_search';
import { selectMovie } from '../reducers/reducer_movies';
import withInfiniteScroll from '../utils/HOC/InfiniteScrollHOC';

import { translate } from 'react-i18next';
  
class MoviesList extends Component {
    componentDidMount() {
        this.props.initMoviesAction();
    }

    showMovieDetails(movie) {
       this.props.selectMovie(movie, this.props.history);
    }

    renderMovies = () => {
        if (this.props.movies) {
            console.log(this.props.movies)
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
        const { t, i18n } = this.props;
        if (this.props.movies) {
            if (this.props.movies.length !== null) {
                return (
                    <div className="movies-filters__container">
                        <span className="movies-filters__container--span">{this.props.movies.length} { t('Results', { framework: "react-i18next" }) }</span>
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
                {this.renderMovies()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ 
        initMoviesAction : initMoviesAction,
        selectMovie: selectMovie
    }, dispatch);
}

const WrappedComponent = withInfiniteScroll(MoviesList);

export default translate('common')(withRouter(connect(null, mapDispatchToProps)(WrappedComponent)));