import axios from 'axios';
import izitoast from 'izitoast';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { messageTypes } from '../constants/websockets';
import socket from './reducer_socket';

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
        axios.post('http://localhost:8080/api/auth/signin', {username, password})
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

export function signInActionOauth(OauthStrategy, history) {
	return (dispatch, { emit }) => {
        window.location.href = 'http://localhost:8080/api/auth/' + OauthStrategy;
    
        console.log(socket)
		// socket.on(messageTypes.authChecked, function(data) {
		// 	console.log(data)
		// 	setAuthorizationToken(data.xsrfToken);
		// 	dispatch({ 
		// 		type: AUTHENTICATED,
		// 		payload: data.user
		// 	});
		// 	history.push('/homepage');
		// })
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