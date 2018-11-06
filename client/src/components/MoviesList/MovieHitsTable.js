import React, { Component } from 'react';

class MovieHitsTable extends React.Component {

    render(){
      const { hits } = this.props
      console.log(hits)
      return (
        <div>
          Hello
        </div>
      )
    }
}

export default MovieHitsTable;