const express = require('express');
const debug = require('debug')('app:authentication');
const controller = require('../controllers/authentication');

const authentication = express.Router();

const router = () => {
  debug('Athentication Router');
  const {
    registerController, loginController, logoutController,
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


  return authentication;
};

module.exports = router;
