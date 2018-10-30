import io from 'socket.io-client';
import { messageTypes } from '../constants/websockets';

export const socket = io('http://localhost:8080', { transports: ['websocket'] });
console.log(socket)

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

/* initialising listeners */
export const init = (store) => {
	Object.keys(messageTypes).forEach(type => socket.on(type, (payload) => 
		store.dispatch({type, payload})
	));
};

/* sending messages */
export const emit = (type, payload) => socket.emit(type, payload);

// export function disconnectSocket() {
//     return (dispatch, getState, {emit}) => {
// 		emit('manual-disconnection', socket.id);
// 		socket.close();
// 		console.log("Socket Closed. ");
//     };
// }

// export function connectSocket() {
//     return (dispatch, getState, {emit}) => {
// 		emit('manual-connection', socket.id);
// 		socket.open();
// 		console.log("Socket Opened. ");
//     };
// }