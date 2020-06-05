const debug = require('debug')('app:home.control');
const { MongoClient } = require('mongodb');
const moment = require('moment');
const chalk = require('chalk');
const util = require('util');

const controller = () => {
  debug('Home Controller');

  // Get the Page
  const getMain = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    // debug(chalk.bold.red(util.inspect(user)));
    client.connect(async (err) => {
      if (err) debug(err);
      let collection = client.db(dbName).collection('users');
      debug('Connected to Server');

      if (req.user) {
        const { username } = req.user;
        req.user = await collection.findOne({ username });
      }

      const { user } = req;
      debug(util.inspect(user));
      collection = client.db(dbName).collection(user ? user.code : 'posts');
      const posts = await collection.find().toArray();
      debug(chalk.green(util.inspect(posts)));
      res.render(
        'home',
        {
          moment,
          posts,
          user,
        },
      );

      client.close();
    });
  };

  return {
    getMain,
  };
};

module.exports = controller;
