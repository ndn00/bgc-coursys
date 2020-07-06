module.exports = {
	renderLogin: (request, result) => {
		result.render('/login');
	},

	login: (request, result) => {
		if(request.user.type === 'admin') {
			result.redirect('/landing');
		} else {
			result.redirect('/login');
		}
	}


}
