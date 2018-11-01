const authListeners = (socket, io) => {
	socket.on('authRequested', (OauthStrategy) => {
        var dest = 'http://localhost:8080/api/auth/' + OauthStrategy;
        io.emit('authRedirect', dest);
	});
};

module.exports = authListeners;