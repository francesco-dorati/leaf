const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authentication.controller');
// const chalk = require('chalk');
const passport = require('passport');

const controller = () => {
  debug('Authentication Controller');

  const registerController = (req, res) => {
    debug(req.body);

    /* Create User */
    const {
      name, surname, username, email, password, code,
    } = req.body;
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');
      debug('Connected to Server');

      const user = {
        name, surname, username, email, password, code, chats: [],
      };

      const result = await collection.insertOne(user);
      debug(result);

      req.login(result.ops[0], () => {
        res.redirect('/profile');
      });

      client.close();
    });
  };

  const loginController = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  });

  const logoutController = (req, res) => {
    req.logout();
    res.redirect('/');
  };

  const authenticationController = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  const usernameController = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    // debug(chalk.bold.red(util.inspect(user)));
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');
      debug('Connected to Server');

      const { username } = req.body;
      const result = await collection.findOne({ username });

      // debug(!result);
      res.send(!result);

      client.close();
    });
  };

  const emailController = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    // debug(chalk.bold.red(util.inspect(user)));
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');
      debug('Connected to Server');

      const { email } = req.body;
      const result = await collection.findOne({ email });

      // debug(!result);
      res.send(!result);

      client.close();
    });
  };

  return {
    registerController,
    loginController,
    logoutController,
    authenticationController,
    usernameController,
    emailController,
  };
};

module.exports = controller;
