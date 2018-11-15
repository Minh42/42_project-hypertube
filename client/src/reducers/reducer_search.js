import axios from 'axios';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

const INITIAL_STATE = {
    loading: false,
    results: null
  };
  
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case SEARCH_REQUEST:
        return { ...state, loading: true};
      case SEARCH_SUCCESS:
        return { ...state, loading: false, results: action.payload };
      case SEARCH_ERROR:
        return { ...state};
      default:
        return state;
    }
}

export function initMoviesAction() {
	return (dispatch) => {
        dispatch({
            type: SEARCH_REQUEST
        });
       axios.post('http://localhost:8080/api/search/movies')
            .catch((err) => {
                console.log(err)
                if(err) {
                    dispatch({
                        type: SEARCH_ERROR
                    });
                }
            })
            .then(res => {
                if(res) {
                    console.log(res.data.movies)
                    dispatch({ 
                        type: SEARCH_SUCCESS,
                        payload: res.data.movies
                    });
                } 
            })
	};
}

export function searchAction(input) {
	return (dispatch) => {
        dispatch({
            type: SEARCH_REQUEST
        });
        axios.post('http://localhost:8080/api/search', {input: input})
            .catch((err) => {
                if(err) {
                    dispatch({
                        type: SEARCH_ERROR
                    });
                }
            })
            .then(res => {
                if(res) {
                    console.log(res)
                    dispatch({ 
                        type: SEARCH_SUCCESS,
                        payload: res.data.movies
                    });
                } 
            })
	};
}