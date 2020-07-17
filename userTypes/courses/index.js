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
  },

  viewCourse: (req, res) => {
      let courseID = parseInt(req.params.id, 10);
      //retrieve name, topic, location, max capacity, current seats, description, session times
      let getCourse = `
        SELECT courses.course_name, courses.topic, courses.location, courses.sessions, courses.seat_capacity, courses.description, course_sessions.session_start, course_sessions.session_end
        FROM courses, course_sessions
        WHERE courses.id = course_sessions.course_id
        AND courses.id=$1;
        `;
      let isOrganizer = (req.user.type === 'organizer');
      database.query(getCourse, [courseID], (dbErr, dbRes) => {
        if (dbErr) {
          return res.json("Database error - viewing courses");
        }
        if (dbRes.rows.length > 0) {
          //only 1 query needed
          //Can be case where there is no course_sessions -> will need to check
          let dateFormat = {
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          };
          let formattedDates = dbRes.rows.map((oldRow) => {
            let newStart = new Date(oldRow.session_start);
            let newFinish = new Date(oldRow.session_end);
            return {
              session_start: newStart.toLocaleString("en-US", dateFormat),
              session_end: newFinish.toLocaleString("en-US", dateFormat)
            };
          });
          let inputObject = {
            isOrganizer: isOrganizer,
            title: dbRes.rows[0]['course_name'],
            topic: dbRes.rows[0]['topic'],
            location: dbRes.rows[0]['location'],
            description: dbRes.rows[0]['description'],
            sessionNum: dbRes.rows[0]['sessions'],
            sessions: formattedDates,
            seats: dbRes.rows[0]['seat_capacity'],
            id: courseID
          }

          return res.render('pages/viewCourse', inputObject);
        } else {
          return res.json("Could not retrieve course records");
        }
      });



  },

}
