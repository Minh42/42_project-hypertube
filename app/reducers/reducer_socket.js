import io from 'socket.io-client';
import * as config from '../constants/websockets';

const { messageTypes } = config;
const socket = io('http://localhost:8080', { transports: ['websocket'] });

// Reducers

export default function (state = null, action) {
	switch(action.type) {
		case messageTypes.userJoined:
			return {
				...state,
				socketID: action.payload.socketID,
				connectedUsers: action.payload.users
			};
		case messageTypes.userLeft:
			return {
				...state,
				connectedUsers: action.payload.users
			}
		default:
		  return state;
	}
}

// Action Creators

/* initialising listeners */
export const init = (store) => {
	Object.keys(messageTypes).forEach(type => socket.on(type, (payload) => 
		store.dispatch({type, payload})
	));
};

/* sending messages */
export const emit = (type, payload) => socket.emit(type, payload);