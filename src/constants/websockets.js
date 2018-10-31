export const messageTypes = [
    'joinRequested',
    'userJoined',
    'userLeft',
    'authChecked'
  ].reduce((accum, msg) => {
    accum[msg] = msg;
    return accum;
  }, {})