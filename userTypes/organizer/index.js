//index.js
//handles organizer-only functions
const database = require('../../database');
const sgMail = require('@sendgrid/mail');

module.exports = {

	//add organizer-only functions here

	//dummy data + will need to build links to organizer-only features
	landing: async (request, result) => {
        let queryCourse = `
        SELECT id, course_name, topic, location, sessions,
                seat_capacity
        FROM courses
        `;

        try {
            var data = [];

            database.query(queryCourse, (errOutDB, dbRes) => {
                if (errOutDB){
                    result.send("Error querying db on landing/main");
                } else {
                    //var dateFormat = {hour:'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    for (var row=0; row < dbRes.rows.length; row++) {
                        let startDate = new Date(dbRes.rows[row].start_date);
                        data.push(
                            {
																id: dbRes.rows[row].id,
																title: dbRes.rows[row].course_name,
                                topic: dbRes.rows[row].topic,
                                delivery: dbRes.rows[row].location,
                                //time: startDate.toLocaleString("en-US", dateFormat),
																sessions: dbRes.rows[row].sessions,
                                seats: '?',
                                maxSeats: dbRes.rows[row].seat_capacity,
                                status: "N/A"
                            }
                        );
                    }
                    console.log(data);
                    result.render('pages/orgIndex', { data: data });
                }
            });
        } catch (err) {
            result.send("Error");
        }
  },
	//as of now, organizer accounts must be manually created
	allusers: (request, result) => {
		//access database
		database.query('SELECT id, email, type FROM users;', (err, dbRes) => {
			if (err) {
				return result.json("Could not retrieve database values to show all users");
			}
			//pass in data to render
			return result.render('pages/allusers', { userData: dbRes.rows, curUser: request.user.email });
		});
	},

	updateUsers: (request, result) => {
		//updates all users whose status has changed
		let tableSize = parseInt(request.body.tableSize, 10);
		let newAttendees = [];
		let attendeeParams = [];
		let newOrganizers = [];
		let organizerParams = [];


		for (let i = 1; i <= tableSize; i++) {
			if (request.body["id" + i]) {
				if (request.body["status" + i] === 'attendee') {
					newAttendees.push(i);
				}
				else {
					newOrganizers.push(i);
				}
				//update database, set type to organizer for users
				//update database, set type to attendee for users
			}

		}
		for (let j = 1; j <= newAttendees.length; j++) {
			attendeeParams.push('$' + j);
		}
		for (let k = 1; k <= newOrganizers.length; k++) {
			organizerParams.push('$' + k);
		}
		let newAttendeeQuery = "UPDATE users SET type='attendee' WHERE id IN (" + attendeeParams.join(',') + ");"
		let newOrganizerQuery = "UPDATE users SET type='organizer' WHERE id IN (" + organizerParams.join(',') + ");"
		console.log(newAttendees);
		console.log(newAttendeeQuery);
		console.log(newOrganizers);
		console.log(newOrganizerQuery);
		if (newAttendees.length > 0) {
			database.query(newAttendeeQuery, newAttendees, (dbErr, dbRes) => {
				if (dbErr) {
					return result.send("Database error - could not update new attendees");
				}
			});
		}
		if (newOrganizers.length > 0) {
			database.query(newOrganizerQuery, newOrganizers, (dbErr, dbRes) => {
				if (dbErr) {
					return result.send("Database error - could not update new organizers");
				}
			});
		}

		result.render('pages/redirect', { redirect: '/organizer/main', message: 'User data has been successfully updated!', target: 'the main courses page'});
	},

	newCourse: (request, result) => {
		result.render('pages/newCourse');
	},

	sendReminders: async (req, res) => {
		// using Twilio SendGrid's v3 Node.js Library
		// https://github.com/sendgrid/sendgrid-nodejs  
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		try {
		let getEmails = 
		`SELECT u.email FROM users u, enrollment e, courses c
		WHERE c.id=e.course_id and e.user_id=u.id and c.id=${req.params.id};`;
		let getCourseInfo =
		`SELECT * FROM courses WHERE id=${req.params.id};`;
		let getNextSession =
		`SELECT * FROM course_sessions WHERE course_id=${req.params.id} AND 
		session_start >= CURRENT_DATE ORDER BY session_start ASC;`
		let emails = await database.query(getEmails);
		let courseInfo = await database.query(getCourseInfo);
		let nextDate = await database.query(getNextSession);
		courseInfo = courseInfo.rows;
		nextDate = nextDate.rows[0].session_start;
		console.log(courseInfo);
		for (row of emails.rows) {
			if (courseInfo === undefined) {
			break;
			}
			const msg = {
			to: row.email,
			from: 'mla283@sfu.ca',
			subject: `Course Reminder: ${courseInfo[0].course_name}`,
			text: `This is a reminder that you are enrolled in ${courseInfo[0].course_name} 
					which is scheduled for ${nextDate} in ${courseInfo[0].location}.
					
					To view more information please visit cmpt276-bgc-coursys.herokuapp.com/courses/${courseInfo[0].id}`,
			html: `This is a reminder that you are enrolled in ${courseInfo[0].course_name} which is scheduled for 
					<br>
					<strong>${nextDate}</strong> in <strong>${courseInfo[0].location}</strong>.
					<br><br>
					To view more information please visit 
					<a target="_blank" href="https://cmpt276-bgc-coursys.herokuapp.com/courses/${courseInfo[0].id}">
					cmpt276-bgc-coursys.herokuapp.com/courses/${courseInfo[0].id}</a>`,
			};
			console.log(msg);
			// will go to catch on failure
			console.log(await sgMail.send(msg));
		}
		res.render('pages/redirect', { redirect: `/courses/${req.params.id}`, message: 'Email sent successfully!', target: 'the course view'});  
		} catch(err) {
			console.log(err);
			res.render('pages/redirect', { redirect: `/courses/${req.params.id}`, message: 'ERROR: EMAIL NOT SENT!', target: 'the course view'});  
		}
	}


}
