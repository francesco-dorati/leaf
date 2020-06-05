const express = require('express');
const debug = require('debug')('app:login');
const controller = require('../controllers/enter.js');

const login = express.Router();

const router = () => {
  debug('Login Route');
  const { registerController } = controller();

  login.route('/')
    .get(registerController);

  return login;
};

module.exports = router;
