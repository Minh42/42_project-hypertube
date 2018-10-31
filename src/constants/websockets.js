export const messageTypes = [
    'joinRequested',
    'userJoined',
    'userLeft',
    'authRequested',
    'authRedirect',
    'authChecked'
  ].reduce((accum, msg) => {
    accum[msg] = msg;
    return accum;
  }, {})