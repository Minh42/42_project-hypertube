import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import socketReducer from './reducer_socket';
import downloadReducer from './reducer_download';
import searchReducer from './reducer_search';
import filtersReducer from './reducer_filters';
import moviesReducer from './reducer_movies';
import { UNAUTHENTICATED } from './reducer_auth';

// mapping of our state
const appReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    socket : socketReducer,
    download: downloadReducer,
    socket: socketReducer,
    search: searchReducer,
    filters: filtersReducer,
    movies: moviesReducer
});

const rootReducer = (state, action) => {
    if (action.type === UNAUTHENTICATED) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;