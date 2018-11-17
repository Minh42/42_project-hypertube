import React, { Component } from 'react';

class MovieHitsTable extends Component {

    render(){
      const { hits } = this.props
      return (
        <div className="movies-list">
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