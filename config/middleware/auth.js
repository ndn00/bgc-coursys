module.exports = {
  requiresLogin: (request, result, next) => {
    if (request.user) {
      return next();
    }
    result.sendStatus(401);
  },
  requiresOrganizer: (request, result, next) => {
    if (request.user && req.user.type === 'organizer') {
      return next();
    }
    result.sendStatus(401);
  }
}
