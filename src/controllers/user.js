const { MongoClient } = require('mongodb');
const debug = require('debug')('app:user.control');
// const chalk = require( 'chalk');

const controller = () => {
  debug('User Controller');

  // Redirects Home
  const searchUser = (req, res) => {
    res.redirect(`/user/${req.body.username}`);
  };

  // Get the User Profile
  const getUserProfile = (req, res) => {
    const { username } = req.params;
    const { user } = req;
    if (user.username === username) {
      res.redirect('/profile');
    } else {
      const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
      const dbName = 'Leaf';
      const client = new MongoClient(url, { useNewUrlParser: true });
      client.connect(async (err) => {
        if (err) debug(err);
        const collection = client.db(dbName).collection('users');
        debug('Connected to Server');

        req.user = await collection.findOne({ username: req.user.username });

        const requestedUser = await collection.findOne({ username });

        if (requestedUser) {
          // res.json(user);
          res.render('user_profile', { requestedUser, user });
        } else {
          res.render('discover', { user, error: true });
        }
        client.close();
      });
    }
  };


  return {
    searchUser,
    getUserProfile,
  };
};

module.exports = controller;
