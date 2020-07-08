const {requiresLogin, requiresOrganizer } = require('./middleware/auth');
//const organizer = require('../userTypes/organizer');
const users = require('../userTypes/users');

module.exports = (app, passport, database) => {

  

  //login and logout
  app.get('/login', users.renderLogin);
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), users.login);
  //app.get('/logout', users.logout);

  //create new user
  app.get('/newuser', users.signup);
  app.post('/newuser', users.createAccount);

  //display landing page
  //app.get('/landing')

  //add additional routes that require authentication to access, else they will be redirected to login

  //admin section unused for now
}
