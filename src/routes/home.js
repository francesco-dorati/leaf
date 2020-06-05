const express = require('express');
const debug = require('debug')('app:home.route');
const controller = require('../controllers/home');
// const chalk = require('chalk');

const home = express.Router();

const router = () => {
  debug('Home');

  const { getMain } = controller();

  // Root Get
  home.route('/').get(getMain);

  return home;
};

module.exports = router;
