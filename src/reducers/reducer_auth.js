import axios from 'axios';
import izitoast from 'izitoast';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

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
        return { ...state, authenticated: false };
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

export function signInActionOauth(accessToken, history) {
	return (dispatch) => {
        setAuthorizationToken(accessToken);
        dispatch({ 
            type: AUTHENTICATED
        });
        history.push('/homepage');
	};
}