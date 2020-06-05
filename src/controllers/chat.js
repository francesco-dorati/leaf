const debug = require('debug')('app:profile.control');
const { MongoClient } = require('mongodb');
// const chalk = require( 'chalk');
const moment = require('moment');

const controller = () => {
  debug('Chat Controller');

  // Get the Page
  const getPage = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });


    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');

      req.user = await collection.findOne({ username: req.user.username });

      const { user } = req;
      res.render('chat', { user, moment });

      client.close();
    });
  };

  // Get the Single Chat
  const getSingleChat = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });

    const { username } = req.params;
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');

      const myUsername = req.user.username;

      const tmp = await collection.findOne({ username: myUsername });

      const result = tmp.chats.filter((temp) => temp.username === username);

      const notifications = result[0] ? -result[0].notifications : 0;

      debug(result[0]);
      await collection.updateOne(
        { username: myUsername, chats: { $elemMatch: { username } } },
        {
          $inc: { notifications },
          $set: { 'chats.$.notifications': 0 },
        },
      );

      req.user = await collection.findOne({ username: myUsername });

      const { user } = req;

      debug(user);

      res.render('single_chat', { user, username, moment });

      client.close();
    });
  };

  return {
    getPage,
    getSingleChat,
  };
};

module.exports = controller;
