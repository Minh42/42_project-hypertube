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
                error: false,
                hasMore: true,
                isLoading: false,
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
            if (this.props.movies) {
                console.log(this.props.movies)
            }
        }
    
        render() {
        return (
            <WrappedComponent 
            {...this.props}
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