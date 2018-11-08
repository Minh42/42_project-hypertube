import React, { Component } from 'react';

class MovieHitsTable extends React.Component {

    render(){
      const { hits } = this.props
      return (
        <div className="movies-list">
            {hits.map(hit => (
                <div key={hit._id} className="movies-list__container">
                  <img src={hit._source.large_cover_image} alt="Logo" className="movies-list__item" />
                  <div className="movies-list__container--info">
                    <div>{hit._source.title}</div>
                    <div>{hit._source.year}</div>
                    <div>{hit._source.rating}</div>
                    </div>
                </div>
            ))}
        </div>
      )
    }
}

export default MovieHitsTable;