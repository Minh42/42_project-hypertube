import React, { Component } from 'react';
import NotFoundPoster from '../assets/img/not-found-poster.jpg';

class NotFound extends Component {    
    render() {
        return (
            <div className="NotFound">
                <img className="NotFound__image" src={NotFoundPoster} />
            </div> 
        );
    }
}

export default NotFound;