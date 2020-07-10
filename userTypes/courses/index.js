//index.js
//Handles implementations of all course paths
//NOTE: this may be split into several sub-files as scope increases

const database = require('../../database');




module.exports = {
  //display login
  renderNewCourse: (request, result) => {
    result.render('pages/newCourse');
  },
  submitNewCourse: (req, res) => {
    let insertQuery = `
      INSERT INTO courses(course_name, topic, location, start_date, end_date, seat_capacity, description)
      VALUES ('${req.body.coursename}', '${req.body.topic}', '${req.body.location}',
        '${req.body.startdate + ' ' + req.body.starttime}', '${req.body.enddate + ' ' + req.body.endtime}',
        ${req.body.capacity}, '${req.body.description}');
      `;
    console.log(insertQuery);
    database.query(insertQuery, (errOutDB, dbRes) => {
      if (errOutDB) {
        return result.json("Database error - inserting course");
      } else {
        res.redirect('/organizer/main');
      }
    });
  }

}
