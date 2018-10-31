const usersListeners = (socket) => {
    socket.on('joinRequested', function(user_id) {
        if (users.length === 0) {
          users.push({
            userID: user_id,
            socketID: socket.id
          });
        } else {
          for (var i = 0; i < users.length ; i++) {
            if (users[i].socketID === socket.id) {
              break;
            } else if (users[i].socketID != socket.id & i + 1 === users.length) {
              users.push({
                userID: user_id,
                socketID: socket.id
              });
              break;
            }
          }
        }
    
        let len = users.length;
        len--;
        io.emit('userJoined', {users: users, socketID: users[len].socketID})
    })

    socket.on('disconnect', function() {
        let user = require('./models/user.class');
        for(let i = 0; i < users.length; i++) {
          if(users[i].socketID === socket.id) {
            users.splice(i,1);
          }
        }
        io.emit('userLeft', {users: users});
    })
};

module.exports = usersListeners;