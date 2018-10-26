import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const AUTHENTICATED = 'AUTHENTICATED';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

const INITIAL_STATE = {
    authenticated: false
  };
  
  export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    //   case 'REHYDRATE':
    //     return {...state, currentUser: action.payload.currentUser
    //   };
      case AUTHENTICATED:
        return { ...state, authenticated: true, error: action.payload };
      case UNAUTHENTICATED:
        return { ...state, authenticated: false };
      case AUTHENTICATION_ERROR:
        return { ...state, error: action.payload };
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
                        type: AUTHENTICATION_ERROR,
                        payload: 'Invalid email or password'
                    });
                }
            })
            .then(res => {
                if(res) {
                    setAuthorizationToken(res.data.xsrfToken);
                        dispatch({ 
                        type: AUTHENTICATED,
                        payload: ''
                    });
                    history.push('/homepage');
                } 
            })
			// localStorage.setItem('jwtToken', token);	
	};
}