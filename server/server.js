const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
const session = require('express-session')
const keys = require('./db/config/keys');
// const socketIO = require('socket.io');
// const socketInit = require('./socket');
const cors = require('cors');
const db = require('./db/connection');
const passport = require('passport');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);

const middlewares = [
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  passport.initialize(),
  passport.session(),
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
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