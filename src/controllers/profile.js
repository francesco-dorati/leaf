const debug = require('debug')('app:profile.control');
const { MongoClient } = require('mongodb');
// const chalk = require( 'chalk');

const controller = () => {
  debug('Profile Controller');

  // Get the Page
  const getPersonalProfile = (req, res) => {
    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    // debug(chalk.bold.red(util.inspect(user)));
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection('users');
      debug('Connected to Server');

      req.user = await collection.findOne({ username: req.user.username });

      const { user } = req;

      res.render('profile', { user });


      client.close();
    });
  };

  return {
    getPersonalProfile,
  };
};

module.exports = controller;
