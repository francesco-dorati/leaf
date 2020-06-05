const express = require('express');
const debug = require('debug')('app:chat.route');
const controller = require('../controllers/chat');
const authentication = require('../controllers/authentication');
// const chalk = require('chalk');

const chat = express.Router();

const router = () => {
  debug('Chat');

  const { getPage, getSingleChat } = controller();
  const { authenticationController } = authentication();

  // Root
  chat.route('/')
    .all(authenticationController)
    .get(getPage);

  // Single Chat
  chat.route('/:username')
    .all(authenticationController)
    .get(getSingleChat);


  return chat;
};

module.exports = router;
