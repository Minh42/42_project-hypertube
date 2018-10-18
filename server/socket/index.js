const defaultListeners = require('./listeners/default');

const initListeners = (socket) => {
	defaultListeners(socket);
};

module.exports = initListeners;