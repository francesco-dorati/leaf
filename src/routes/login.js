const express = require('express');
const debug = require('debug')('app:login');
const controller = require('../controllers/enter.js');

const login = express.Router();

const router = () => {
  debug('Login Route');
  const { loginController } = controller();

  login.route('/')
    .get(loginController);

  return login;
};

module.exports = router;
