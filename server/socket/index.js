const authListeners = require('./listeners/authListeners'); 
const usersListeners = require('./listeners/usersListeners');

const initListeners = (io) => {
	io.sockets.on('connection', function(socket) {
		authListeners(socket, io);
		// usersListeners(socket, io);
	})
};

module.exports = initListeners;