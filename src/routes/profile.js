const express = require('express');
const debug = require('debug')('app:profile.route');
const controller = require('../controllers/profile');
const authentication = require('../controllers/authentication');
// const chalk = require('chalk');

const profile = express.Router();

const router = () => {
  debug('Profile');

  const { getPersonalProfile } = controller();
  const { authenticationController } = authentication();

  // Root
  profile.route('/')
    .all(authenticationController)
    .get(getPersonalProfile);

  return profile;
};

module.exports = router;
