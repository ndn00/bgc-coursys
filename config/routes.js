//routes.js
//adapted from https://github.com/DayOnePl/dos-server/blob/master/config/routes.js
//API for website


const auth = require('./middleware/auth');
//const organizer = require('../userTypes/organizer');
const users = require('../userTypes/users');
const courses = require('../userTypes/courses');

module.exports = (app, passport, database) => {
  //login and logout
  app.get('/login', users.renderLogin);
  app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), users.login);
  app.get('/logout', users.logout);

  //testing function
  app.get('/isLoggedIn', auth.requiresLogin, users.isLoggedIn);

  //Landing page - MANUALLY MERGED
  app.get('/main', auth.requiresLogin, users.landing);

  //create new user
  app.get('/newuser', users.signup);
  app.post('/newuser', users.createAccount);
  

  //display landing page
  //app.get('/landing')

  //add additional routes that require authentication to access, else they will be redirected to login

  //admin section unused for now

  // create new course
  app.get('/newcourse', courses.renderNewCourse);
  app.post('/newcourse', courses.submitNewCourse);

}
