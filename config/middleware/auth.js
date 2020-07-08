//auth.js
//adapted from https://github.com/DayOnePl/dos-server/blob/master/config/middlewares/authorization.js
//Usage: in routes.js, prepend the appropriate "access control" function
//ie: app.HTTP_METHOD('PATH', ACCESS_MODIFER, CALLBACK) where ACCESS_MODIFIER is a function below

module.exports = {
  requiresLogin: (request, result, next) => {
    if (request.user) {
      return next();
    }
    result.sendStatus(401);
  },
  requiresOrganizer: (request, result, next) => {
    if (request.user && request.user.type === 'organizer') {
      return next();
    }
    result.sendStatus(401);
  }
}
