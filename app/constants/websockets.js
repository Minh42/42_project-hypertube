export const messageTypes = [
    'joinRequested',
    'userJoined',
    'userLeft'
  ].reduce((accum, msg) => {
    accum[msg] = msg;
    return accum;
  }, {})