import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMovie } from '../../reducers/reducer_movies';
  
class PreviewResult extends Component { 

    handleClick = async (itm) => {
        this.props.clickPreview(itm);
        //this.props.onSelectMovie(itm, this.props.history);
    }

    displayPreview = (result) => {
        const list = result.slice(0, 5).map((itm, index) => {
            return (
                <li onClick={() => this.handleClick(itm)} key={index} className='preview-itm'>
                    {itm._source.title}
                </li>
            )
        });
        return list;
    }

    render () {

        let view = <ul className='preview'>{this.displayPreview(this.props.preview)}</ul>
        if (this.props.preview.length === 0)
            view = null;      

        return (
            view
        )
    }
}

function mapDispatchToProps(dispatch) { 
    return {
        onSelectMovie: (movie, history) => dispatch(selectMovie(movie, history))
    }
}

export default connect(null, mapDispatchToProps)(PreviewResult);