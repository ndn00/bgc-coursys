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
      INSERT INTO courses (course_name, topic, location, sessions, seat_capacity, description)
      VALUES ('${req.body.coursename}', '${req.body.topic}', '${req.body.location}',
        '${req.body.sessionTracker}',
        ${req.body.capacity}, '${req.body.description}')
        RETURNING id;
      `;
    //use returning from first query to get the ID for the session insert


    //console.log(insertQuery);
    database.query(insertQuery, (errOutDB, dbRes) => {
      if (errOutDB) {
        return result.json("Database error - inserting course");
      } else {
        console.log(dbRes.rows);
        //gather number of sessions
        let numSessions = parseInt(req.body.sessionTracker, 10);
        let insertSession = [];

        //construct query
        let insertSessionQuery = 'INSERT INTO course_sessions (course_id, session_start, session_end) VALUES\n';
        for (let i = 1; i <= numSessions; i++) {
            insertSessionQuery += '(';
            insertSession.push(dbRes.rows[0].id);
            insertSession.push(req.body['sessionDate' + i] + ' ' + req.body['startTime' + i]);
            insertSession.push(req.body['sessionDate' + i] + ' ' + req.body['endTime' + i]);
            insertSessionQuery += `$${(i-1)*3 + 1}, $${(i-1)*3 + 2}, $${(i-1)*3 + 3})`
            if (i < numSessions) {
              insertSessionQuery += ',\n';
            }

        }
        insertSessionQuery += ';'
        console.log(insertSessionQuery);
        console.log(insertSession);
        database.query(insertSessionQuery, insertSession, (errOutDB1, dbRes1) => {
          if (errOutDB1) {
            return res.json("Database error - inserting course sessions");
          }
          return res.redirect('/organizer/main');
        });
      }
    });
  }

}
