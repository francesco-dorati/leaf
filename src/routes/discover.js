const express = require('express');
const debug = require('debug')('app:discover.route');
const controller = require('../controllers/discover');
const authentication = require('../controllers/authentication');
// const chalk = require('chalk');

const discover = express.Router();

const router = () => {
  debug('Discover');

  const { getPage } = controller();
  const { authenticationController } = authentication();

  // Root
  discover.route('/')
    .all(authenticationController)
    .get(getPage);

  return discover;
};

module.exports = router;
