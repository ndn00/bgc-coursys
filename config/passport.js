const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, database) => {
  passport.use(new LocalStrategy({
    usernameField: 'uname',
    passwordField: 'pwd'
  }, (email, password, callback) => {
    database.query('SELECT id, email, password, type FROM users WHERE email=$1;', [email], (err, dbres) => {
      if (err) {
        console.log("Database error: login-related");
        return callback(error);
      }
      if (dbres.rows.length > 0) {
        const resultRow = dbres.rows[0];
        console.log(resultRow);
        bcrypt.compare(password, resultRow.password, function(err, hashres) {
          if (hashres) {
            callback(null, { id: resultRow.id, email: resultRow.email, type: resultRow.type});
          } else {
            callback(null, false);
          }
        })
      } else {
        callback(null, false);
      }
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    database.query('SELECT id, email, type FROM users WHERE id=$1;', [parseInt(id, 10)], (err, result) => {
      if (err) {
        console.log("Error on selecting user on session deserialize");
        return callback(err);
      }
      callback(null, result.rows[0]);
    })
  });
}
