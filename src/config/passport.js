const passport = require('passport');// Menages the user access
require('./strategies/local.strategy')();

const passportConfig = (app) => {
  app.use(passport.initialize());// Initializes passport on app
  app.use(passport.session());// Sets up a session

  passport.serializeUser((user, done) => {
    done(null, user);// Callback that stores the user   done(error check, user [or user.id] )
  });// STORES user in a session

  passport.deserializeUser((user, done) => {
    done(null, user);// Callback that stores the user   done(error check, user [or user.id] )
  });// REMOVES user from a session
};

module.exports = passportConfig;
