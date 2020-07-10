//routes.js
//adapted from https://github.com/DayOnePl/dos-server/blob/master/config/routes.js
//API for website


const auth = require('./middleware/auth');
const organizer = require('../userTypes/organizer');
const users = require('../userTypes/users');
const courses = require('../userTypes/courses');

module.exports = (app, passport, database) => {
  //login and logout
  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local', { failureRedirect: '/loginfail'}), users.login);
  app.get('/loginfail', users.loginFail);
  app.get('/logout', auth.requiresLogin, users.logout);

  //Landing page
  app.get('/main', auth.requiresLogin, users.landing);

  //create new user of attendee status
  app.get('/newuser', users.signup);
  app.post('/newuser', users.createAccount);



  //organizer-only paths
  app.get('/organizer/main', auth.requiresOrganizer, organizer.landing);
  app.get('/organizer/allusers', auth.requiresOrganizer, organizer.allusers);
  app.post('/organizer/allusers', auth.requiresOrganizer, organizer.updateUsers);
  app.get('/organizer/courses/new', auth.requiresOrganizer, organizer.newCourse);
  //add option for change status of members


  //add additional routes that require authentication to access, else they will be redirected to login
  //view course details -> need identifier
  //edit course details -> need identifier





  //admin section unused for now

  // create new course
  app.get('/newcourse', courses.renderNewCourse);
  app.post('/newcourse', courses.submitNewCourse);

}
