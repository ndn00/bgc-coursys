//index.js
//Handles implementations of all course paths
//NOTE: this may be split into several sub-files as scope increases

const database = require('../../database');




module.exports = {
  //display login
  renderNewCourse: (request, result) => {
    result.render('pages/newCourse');
  }

}
