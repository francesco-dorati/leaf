// External Modules
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 80;

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Internal Modules
const home = require('./src/routes/home')();
const discover = require('./src/routes/discover')();
const profile = require('./src/routes/profile')();
const chat = require('./src/routes/chat')();
const user = require('./src/routes/user')();
const login = require('./src/routes/login')();
const register = require('./src/routes/register')();
const authentication = require('./src/routes/authentication')();
const socket = require('./src/controllers/socket');


// Set-Ups
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'node' }));
// Paths
app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Passport
require('./src/config/passport.js')(app);


// Home
app.use('/', home);

// Discover
app.use('/discover', discover);

// Profile
app.use('/profile', profile);

// Chat
app.use('/chat', chat);

// Users
app.use('/user', user);

// Login
app.use('/login', login);

// Register
app.use('/register', register);

// Authentication
app.use('/authentication', authentication);

// Socket
io.on('connection', socket);

// 404
app.use((req, res) => {
  res.status(404);
  res.render('status404');
});

// Listen
server.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
