//index.js
//handles organizer-only functions

module.exports = {

	//add organizer-only functions here
	login: (request, result) => {
		if(request.user.type === 'organizer') {
			result.redirect('/organizer/main');
		} else {
			result.redirect('/organizer/login');
		}
	},

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
				//testing block - remove for production
				{
          title: request.user.id, topic: request.user.email,
          delivery: "Remote", time: "6:00 pm, July 4, 2020",
          seats: 45, maxSeats: 50, status: request.user.type,
        }
    ];
    result.render('pages/index', { data: data });
  },
	//as of now, organizer accounts must be manually created


}
