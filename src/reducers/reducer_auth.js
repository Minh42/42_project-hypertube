import axios from 'axios';
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
        return { ...state, authenticated: true };
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
		try {
			axios.post('http://localhost:8080/api/auth/signin', {username, password}).then(res => {
                console.log(res.data)
			// dispatch({ 
			// 	type: AUTHENTICATED
			// });
			// dispatch(reset('signin'));
			// const token = res.data.token;
			// localStorage.setItem('jwtToken', token);
			// setAuthorizationToken(token);
			// history.push('/onboarding');
			})
		} catch (error) {
			dispatch({
				type: AUTHENTICATION_ERROR,
				payload: 'Invalid email or password'
			});
		}
	};
}