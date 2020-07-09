//index.js
//handles organizer-only functions

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

	//stub for user access control page


}
