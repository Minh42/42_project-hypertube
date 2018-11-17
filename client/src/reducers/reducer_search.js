import axios from 'axios';
import izitoast from 'izitoast';
import { withCredentials } from '../utils/headers';
import { UNAUTHENTICATED } from './reducer_auth';
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
	return async (dispatch) => {
        dispatch({
            type: SEARCH_REQUEST
        });
        try {
            const res = await axios.post('http://localhost:8080/api/search/movies', {}, withCredentials());
            if (res) {
                dispatch({ 
                    type: SEARCH_SUCCESS,
                    payload: res.data.movies
                });
            }
        } catch (err) {
            if(err) {
                console.log(err.response.status)
                switch (err.response.status) {
                    case 401:
                        izitoast.error({
                            message: 'Please retry to login',
                            position: 'topRight'
                        });
                        dispatch({ 
                            type: UNAUTHENTICATED,
                            payload: null
                        })
                        break;
                    case 403 :
                        izitoast.error({
                            message: 'Please retry to login',
                            position: 'topRight'
                        });
                        dispatch({ 
                            type: UNAUTHENTICATED,
                            payload: null
                        })
                        break;
                    default :
                        dispatch({
                            type: SEARCH_ERROR
                        });
                        izitoast.error({
                            message: 'Oops, something went wrong!',
                            position: 'topRight'
                        });
                        break;
                }
            }
        }
	};
}

export function searchAction(input) {
	return (dispatch) => {
        dispatch({
            type: SEARCH_REQUEST
        });
        axios.post('http://localhost:8080/api/search', {input: input}, withCredentials())
            .catch((err) => {
                if(err) {
                    switch (err.response.status) {
                        case 401 :
                            izitoast.error({
                                message: 'Please retry to login',
                                position: 'topRight'
                            });
                            dispatch({ 
                                type: UNAUTHENTICATED,
                                payload: null
                            })
                            break;
                        case 403 :
                            izitoast.error({
                                message: 'Please retry to login',
                                position: 'topRight'
                            });
                            dispatch({ 
                                type: UNAUTHENTICATED,
                                payload: null
                            })
                            break;
                        default :
                            dispatch({
                                type: SEARCH_ERROR
                            });
                            izitoast.error({
                                message: 'Oops, something went wrong!',
                                position: 'topRight'
                            });
                            break;
                    }
                }
            })
            .then(res => {
                if(res) {
                    dispatch({ 
                        type: SEARCH_SUCCESS,
                        payload: res.data.movies
                    });
                } 
            })
	};
}