module.exports = {
  login: (request, result) => {
    const { user } = request;
    result.json(user);
  },

  logout: (request, result, next) => {
    request.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      request.logout();
      result.sendStatus(200);
    });
  },

  ping: (request, result) => {
    result.sendStatus(200);
  }
}
