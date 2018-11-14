import React from 'react';

const Cmt = ({username, message, date}) => {
    return (
        <div className="movie-cmt">
            <h4> {username} </h4>
            <div> {message} </div>
            <p> {date} </p>
        </div>
    )
}

export default Cmt;