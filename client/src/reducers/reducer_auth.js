import axios from 'axios';
import izitoast from 'izitoast';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { withCredentials } from '../utils/headers';

export const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

const INITIAL_STATE = {
    authenticated: false,
    currentUser: null
  };
  
export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    //   case 'REHYDRATE':
    //     return {...state, currentUser: action.payload.currentUser
    //   };
      case AUTHENTICATED:
        return { ...state, authenticated: true, currentUser: action.payload};
      case UNAUTHENTICATED:
        return { ...state, authenticated: false, currentUser: action.payload };
      case AUTHENTICATION_ERROR:
        return { ...state};
      default:
        return state;
    }
}

export function signInAction({username, password}, history) {
	return (dispatch) => {
        axios.post('http://localhost:8080/api/auth/signin', {username, password}, withCredentials()
    )
            .catch((err) => {
                if(err) {
                    dispatch({
                        type: AUTHENTICATION_ERROR
                    });
                    izitoast.error({
                        message: 'Invalid email or password',
                        position: 'topRight'
                    });
                }
            })
            .then(res => {
                if(res) {
                    localStorage.setItem('xsrf', res.data.xsrfToken)
                    setAuthorizationToken(res.data.xsrfToken);
                    dispatch({ 
                        type: AUTHENTICATED,
                        payload: res.data.user
                    });
                    history.push('/homepage');
                } 
            })
	};
}

export function signInActionOauth(xsrfToken, user, history) {
	return (dispatch) => {
		setAuthorizationToken(xsrfToken);
        dispatch({ 
            type: AUTHENTICATED,
            payload: user
        });
        history.push('/homepage');
	}
}

export function signOutAction(history) {
	return (dispatch) => {
		setAuthorizationToken(false);
		dispatch({ 
			type: UNAUTHENTICATED,
			payload: null
		})
        axios.get('http://localhost:8080/api/auth/logout');
        history.push('/')
	}
}