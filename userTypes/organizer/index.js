//index.js
//handles organizer-only functions
const database = require('../../database');


module.exports = {

	//add organizer-only functions here

	//dummy data + will need to build links to organizer-only features
	landing: (request, result) => {
    var data = [
        {
            title: "CMPT276", topic: "Computer Science",
            delivery: "Remote", time: "5:30pm, July 8th, 2020",
            seats: 86, maxSeats: 100, status: "Enrolled",
        },
        {
            title: "CMPT276", topic: "Computer Science",
            delivery: "Remote", time: "5:30pm, July 8th, 2020",
            seats: 86, maxSeats: 100, status: "Enrolled",
        },

    ];
    result.render('pages/orgIndex', { data: data });
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
		result.json("Work in progress");
	},


}
