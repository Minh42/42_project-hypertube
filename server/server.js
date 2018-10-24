const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes.js')

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// const socketIO = require('socket.io');
// const socketInit = require('./socket');
const cors = require('cors');
const db = require('./db/connection');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);


//PASSEPORT 

// passport.serializeUser(function(user, done) {
//   done(null, user[0].user_id); // serialize user_id
// });
 
// passport.deserializeUser(function(id, done) {
//   user.searchByColName("user_id", id).then(function(user) {
//       done(null, user);
//     })
// });

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

const middlewares = [
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
]

app.use(middlewares)
app.use('/', routes)
app.use('/static', express.static(path.join(__dirname, 'assets')))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(PORT, () => {
  console.log('App running at http://localhost:8080')
})