import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFilterMovies } from '../../selectors/index';
import throttle from 'lodash/throttle';

const withInfiniteScroll = (WrappedComponent) => {
    class HOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                hasMore: true,
                offset: 20,
                movies: []
            };
            this.onScroll = throttle(this.onScroll.bind(this), 50);
        }
    
        componentDidMount() {
            this.loadMovies();
            window.addEventListener('scroll', this.onScroll, false);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll, false);
        }
    
        onScroll() {
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.props.movies) {
                this.loadMovies();
            }
        }

        loadMovies = () => {
            console.log(this.props.movies)
            if (this.props.movies) {
                console.log(this.props.movies)
                if (this.state.offset <= this.props.movies.length) {
                    this.setState({ isLoading: true })
                    this.setState({ movies: this.props.movies.slice(0, this.state.offset)})
                    this.setState({ offset: this.state.offset + 20 });
                    this.setState({ isLoading: false })
                }
            }
        }
    
        render() {
        return (
            <WrappedComponent 
                {...this.props}
                movies={this.state.movies}
                loading={this.state.isLoading}
            />
        ); 
        }
    }

    function mapStateToProps(state) {
        return {
            movies: getFilterMovies(state)
        };
    }

    return connect(mapStateToProps, null)(HOC);
}

export default withInfiniteScroll;