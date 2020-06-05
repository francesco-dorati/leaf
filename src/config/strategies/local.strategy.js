const passport = require('passport');// Menages the user access
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const { MongoClient } = require('mongodb');

const local = () => {
  passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    }, (username, password, done) => { // (usernameField, passwordField, done ())
      const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
      const dbName = 'Leaf';
      const client = new MongoClient(url, { useNewUrlParser: true });
      client.connect(async (err) => {
        if (err) debug(err);
        const collection = client.db(dbName).collection('users');
        debug('Connected to Server');

        const user = await collection.findOne({ email: username });
        if (user.password === password) {
          process.user = user;
          done(null, user);
        } else {
          done(null, false);
        }

        client.close();
      });
    },
  ));
};

module.exports = local;
