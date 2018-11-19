import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterRange from './MoviesList/FilterRange';
import SortBy from './MoviesList/SortBy';
import FiltersGenders from './MoviesList/FiltersChekbox';
import MovieCard from './MoviesList/MovieCard';
import { getFilterMovies } from '../selectors/index';
import { initMoviesAction } from '../reducers/reducer_search';
import { selectMovie } from '../reducers/reducer_movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withNamespaces } from 'react-i18next';
import axios from 'axios';
  
class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasMore: true,
            offset: 20,
            items: [],
            seenMovies: []
        }
    };

    async componentDidMount() {
        this.signal = await axios.CancelToken.source();
        console.log("SIGNAL", this.signal)
        await this.props.onMovieAction(this.props.history);
        const res = await axios.get('http://localhost:8080/api/movie/all', {withCredentials: true, cancelToken: this.signal.token});

        let seenMoviesIDs = [];
        for (var k = 0; k < res.data.length; k++) {
            seenMoviesIDs.push(res.data[k].imdbid);
        }
        
        this.setState({ seenMovies: seenMoviesIDs });
    }

    static getDerivedStateFromProps(props, state) {
        const copy = JSON.parse(JSON.stringify(props.movies));
        if (copy) {
            const test = copy.slice(0, state.offset);
            return {
                items: test
            }
        } else {
            return {
                items: null
            }
        }
    }

    fetchMoreData = () => {
        if (this.props.movies) {
            if (this.state.offset <= this.props.movies.length) {
                this.setState({ 
                    loading : true,
                    hasMore: true,
                    items: this.props.movies.slice(0, this.state.offset),
                    offset: this.state.offset + 20 
                })
            } else {
                this.setState({ 
                    loading : false,
                    hasMore: false,
                    items: this.props.movies
                })
            }
        }
    }

    showMovieDetails(movie) {
       this.props.onSelectMovie(movie, this.props.history);
    }

    renderMovies = () => {
        if (this.state.items) {
            return this.state.items.map((movie, i) => {
                var seen;
                if (this.state.seenMovies.includes(movie._source.imdb_id)) {
                    seen = true;
                } else {
                    seen = false;
                }
                return (
                    <div key={i} className="movies-list-container">
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                        >
                        <MovieCard
                            key={i}
                            movie={movie}
                            showMovieDetails={this.showMovieDetails.bind(this)}
                            seen={seen}
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
        const { t } = this.props;
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

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
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

function mapDispatchToProps(dispatch, props) { 
    const { t } = props;
    return {
        onMovieAction: (history) => dispatch(initMoviesAction(history, t)),
        onSelectMovie: (movie, history) => dispatch(selectMovie(movie, history))
    }
}

export default withNamespaces('common')(withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList)));