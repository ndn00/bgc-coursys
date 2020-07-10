//index.js
//handles organizer-only functions
const database = require('../../database');

module.exports = {

	//add organizer-only functions here

	//dummy data + will need to build links to organizer-only features
	landing: async (request, result) => {
        let queryCourse = `
        SELECT id, course_name, topic, location,start_date, end_date,
                seat_capacity
        FROM courses
        WHERE start_date >= CURRENT_DATE;
        `;

        try {
            var data = [];

            database.query(queryCourse, (errOutDB, dbRes) => {
                if (errOutDB){
                    result.send("Error querying db on landing/main");
                } else {
                    var dateFormat = {hour:'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    for (var row=0; row < dbRes.rows.length; row++) {
                        let startDate = new Date(dbRes.rows[row].start_date);
                        data.push(
                            {
                                title: dbRes.rows[row].course_name,
                                topic: dbRes.rows[row].topic,
                                delivery: dbRes.rows[row].location,
                                time: startDate.toLocaleString("en-US", dateFormat),
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
		let tableSize = parseInt(request.body.tableSize, 10);
		for (let i = 1; i <= tableSize; i++) {
			if (request.body["id" + i]) {
				console.log("Ok" + i);
				//update database, set type to organizer for users

				//update database, set type to attendee for users
			}
		}
		result.render('pages/redirect', { redirect: '/organizer/main', message: 'User data has been successfully updated!', target: 'the main courses page'});
	},

	newCourse: (request, result) => {
		result.render('pages/newCourse');
	}


}
