import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class Rating extends Component {
    render() {
        const { rating } = this.props;
        const newRating = rating * 5 / 10;
        return (
            <StarRatings
              rating={newRating}
              starRatedColor="gold"
              numberOfStars={5}
              name='rating'
              starDimension="1.5rem"
              starSpacing="0.1rem"
            />
        );
    }
}

export default Rating;