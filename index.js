//Dependencies
const express = require('express');
const passport = require('passport');
const PORT = process.env.PORT || 5000;

let app = express();

//Require databases in other files
const db = require('./database');

//Imported from other folders
require('./config/passport')(passport, db);
require('./config/express')(app, passport, db.pool);
require('./config/routes')(app, passport, db);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
