import React from 'react';

const Cmt = ({username, goToProfile, userid, message, date}) => {
    return (
        <div className="movie-cmt">
            <h4 onClick={() => goToProfile(userid)}> {username} </h4>
            <div> {message} </div>
            <p> {date} </p>
        </div>
    )
}

export default Cmt;