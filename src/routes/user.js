const express = require('express');
const debug = require('debug')('app:user.route');
const controller = require('../controllers/user');
const authentication = require('../controllers/authentication');
// const chalk = require('chalk');

const user = express.Router();

const router = () => {
  debug('User');

  const { searchUser, getUserProfile } = controller();
  const { authenticationController } = authentication();

  // Root
  user.route('/')
    .all(authenticationController)
    .post(searchUser);

  // Username Search
  user.route('/:username')
    .all(authenticationController)
    .get(getUserProfile);

  return user;
};

module.exports = router;
