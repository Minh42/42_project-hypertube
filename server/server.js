const path = require('path')
const http = require('http')
const express = require('express')
const routes = require('./routes/index.js')
const db = require('./data/db/connection.js');
const keys = require('./data/config/keys');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);

// SOCKET IO
const socketIO = require('socket.io');
const socketInit = require('./socket');
// const io = socketIO(server);
// socketInit(io);

// ELASTIC SEARCH
// const elasticsearch = require('elasticsearch');
// const client = new elasticsearch.Client({  
//   hosts: [ 'localhost:9200']
// });

// client.ping({
//   requestTimeout: 30000,
// }, function(err) {
//   if (err) {
//       console.error('Elasticsearch cluster is down!');
//   } else {
//       console.log('Everything is ok');
//   }
// });

// MIDDLEWARES
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const middlewares = [
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
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
  res.header('Access-Control-Allow-Credentials', true);
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
  console.log('App running at http://localhost:3000')
})

// module.exports.io = io;
// module.exports.client = client;