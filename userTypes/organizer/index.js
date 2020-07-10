//index.js
//handles organizer-only functions

const database = require("../../database");

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

	//stub for user access control page


}
