const slug = require('slug')

export const MOVIE_SELECTED = 'MOVIE_SELECTED';

export default function(state = null, action) {
    switch(action.type) {
        case MOVIE_SELECTED:
            return { ...state, selectedMovie: action.payload };
    }
    return state;
}

export function selectMovie(movie, history) {
    return (dispatch) => {
        let title = slug(movie._source.title);
        dispatch({
            type: MOVIE_SELECTED,
            payload: movie
        });
        history.push('/movie/' + title);
    }
}