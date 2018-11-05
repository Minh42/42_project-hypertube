const usersListeners = require('./listeners/usersListeners');

const initListeners = (io) => {
	io.sockets.on('connection', function(socket) {
		usersListeners(socket, io);
	})
};

module.exports = initListeners;