const debug = require('debug')('app:enter.controller');
// const chalk = require('chalk');
// const util = require('util');

const controller = () => {
  debug('Enter Controller');

  const loginController = (req, res) => {
    res.render('login');
  };

  const registerGetController = (req, res) => {
    res.render('register');
  };

  const registerPostController = (req, res) => {
    res.render('register_password', { ...req.body });
  };

  return {
    loginController,
    registerGetController,
    registerPostController,
  };
};

module.exports = controller;
