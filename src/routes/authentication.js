const express = require('express');
const debug = require('debug')('app:authentication');
const controller = require('../controllers/authentication');

const authentication = express.Router();

const router = () => {
  debug('Athentication Router');
  const {
    registerController, loginController, logoutController, usernameController, emailController,
  } = controller();

  /* REGISTER */
  authentication.route('/register')
    .post(registerController);

  /* LOGIN */
  authentication.route('/login')
    .post(loginController);

  /* LOGOUT */
  authentication.route('/logout')
    .get(logoutController);

  /* USERNAME */
  authentication.route('/username')
    .post(usernameController);

  /* EMAIL */
  authentication.route('/email')
    .post(emailController);

  return authentication;
};

module.exports = router;
