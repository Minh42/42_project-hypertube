import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterRange from './MoviesList/FilterRange';
import SortBy from './MoviesList/SortBy';
import FiltersGenders from './MoviesList/FiltersChekbox';
import MovieCard from './MoviesList/MovieCard';
import Loader from './Loader/Loader';
import { bindActionCreators } from 'redux';
import { initMoviesAction } from '../reducers/reducer_search';
import { selectMovie } from '../reducers/reducer_movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { translate } from 'react-i18next';
  
class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            offset: 20,
            items: []
        }
    };

    componentDidMount() {
        this.props.initMoviesAction();
    }

    fetchMoreData() {
        if (this.props.movies) {
            console.log(this.props.movies)
            if (this.state.offset <= this.props.movies.length) {
                this.setState({ movies: this.props.movies.slice(0, this.state.offset)})
                this.setState({ offset: this.state.offset + 20 });
            }
        }
    }

    showMovieDetails(movie) {
       this.props.selectMovie(movie, this.props.history);
    }

    renderMovies = () => {
        if (this.state.items) {
            return this.state.items.map((movie, i) => {
                return (
                    <div key={i} className="movies-list">
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                        <MovieCard
                            key={i}
                            movie={movie}
                            showMovieDetails={this.showMovieDetails.bind(this)}
                        />
                        </InfiniteScroll>
                    </div>
                )
            });
        } else {
            return;
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

export default translate('common')(withRouter(connect(null, mapDispatchToProps)(MoviesList)));
