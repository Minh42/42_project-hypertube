import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterRange from './MoviesList/FilterRange'
import SortBy from './MoviesList/SortBy'
import { getFilterMovies } from '../selectors/index';
import { bindActionCreators } from 'redux';
import { initMoviesAction } from '../reducers/reducer_search';
  
class MoviesList extends Component {

    componentDidMount() {
        console.log('here')
        this.props.initMoviesAction();
    }

    renderMovies() {
        if (this.props.movies) {
            return (
                <div className="movies-list">
                    {this.props.movies.map(movie => (
                        <div key={movie._id} className="movies-list__container">
                            <img src={movie._source.large_cover_image} alt="Logo" className="movies-list__item" />
                            <div className="movies-list__container--info">
                                <div>{movie._source.title}</div>
                                <div>{movie._source.year}</div>
                                <div>{movie._source.rating}</div>
                            </div>
                         </div>
                    ))}
                </div>
            )
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
	return bindActionCreators({ initMoviesAction : initMoviesAction }, dispatch);
} 

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);