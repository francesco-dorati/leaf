const debug = require('debug')('app:book.controller');
// const chalk = require('chalk');

const controller = () => {
  debug('Enter Controller');

  const loginController = (req, res) => {
    res.render('login');
  };

  const registerController = (req, res) => {
    res.render('register');
  };

  return {
    loginController,
    registerController,
  };
};

module.exports = controller;
