module.exports = {
  renderLogin: (request, result) => {
    console.log("called renderLogin");
    result.render('pages/login');



	},

  login: (request, result) => {
		result.render('pages/landing');
	},

  /*logout: (request, result, next) => {
    request.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      request.logout();
      result.sendStatus(200);
    });
  },*/

  signup: (request, result) => {
    result.render('pages/signUp');
  }

}
