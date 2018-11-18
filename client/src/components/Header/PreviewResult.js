import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMovie } from '../../reducers/reducer_movies';
  
class PreviewResult extends Component { 

    state = {
        display:true
    }

    displayPreview = (result) => {
        console.log(this.props.history);
        const list = result.slice(0, 5).map((itm, index) => {
            return (
                <li onClick={() => this.props.onSelectMovie(itm, this.props.history)} key={index} className='preview-itm'>
                    {itm._source.title}
                </li>
            )
        });
        return list;
    }

    render () {

        let view = this.state.display 
                                ? <ul className='preview'>{this.state.display && this.displayPreview(this.props.preview)}</ul> 
                                : null;
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