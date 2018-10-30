const usersListeners = require('./listeners/usersListeners');

const initListeners = (socket) => {
	usersListeners(socket);
};

module.exports = initListeners;