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
// const socketIO = require('socket.io');
// const socketInit = require('./socket');
// const io = socketIO(server);
// socketInit(io);

// MIDDLEWARES
const cors = require('cors');
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

const middlewares = [
  //cors(),
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PROPFIND');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});


//app.use(cors({origin: 'http://localhost:3000'}));

app.use(middlewares)

app.use('/static', express.static(path.join(__dirname, 'assets')));
//app.use('/vtt', cors({origin: 'http://localhost:3000'}), express.static(path.join(__dirname, 'my-files')))

app.use('/my-files', express.static(path.join(__dirname, 'my-files')));

/*app.use(express.static(path.join(__dirname, './build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});
*/
app.use('/', routes);

////app.use((req, res, next) => {
 // res.status(404).send("Sorry can't find that!")
//})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(PORT, () => {
  console.log('App running at http://localhost:8080')
})

// module.exports.io = io;