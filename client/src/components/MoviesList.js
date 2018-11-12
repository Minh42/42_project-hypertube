import React, { Component } from 'react';
import { connect } from 'react-redux';
  
class MoviesList extends Component { 
    
    render() {
        if (this.props.movies) {
            return (
                <div className="movies-search">
                    <Filter />
                    <div className="filters">
                        'Hello'
                        
    
                    </div>
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
                </div>
            );  
        } else {
            return (
                <div>hello</div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        movies: state.search.results
    };
}

export default connect(mapStateToProps, null)(MoviesList);