export const START_STREAMING = 'START_STREAMING';

const INITIAL_STATE = {
    stream_link: ""
  };
  
  export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case START_STREAMING:
        return { ...state, stream_link: action.stream_link};
      default:
        return state;
    }
  }

export function startStreaming({stream_link}, history) {
	return (dispatch) => {
        console.log("dispatch")
        dispatch({type: START_STREAMING, stream_link: stream_link});
              
	};
}
