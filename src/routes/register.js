const express = require('express');
const debug = require('debug')('app:login');
const controller = require('../controllers/enter.js');

const login = express.Router();

const router = () => {
  debug('Login Route');
  const { registerGetController, registerPostController } = controller();

  login.route('/')
    .get(registerGetController);

  login.route('/')
    .post(registerPostController);

  return login;
};

module.exports = router;
