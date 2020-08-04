//index.js
//Where the server is run

//Dependencies
const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

let app = express();
let server = require('http').createServer(app);

const io = require('./config/io').initialize(server);

io.on('connection', function (socket) {
    console.log("connected");
    io.emit('status', { status: "hi" }); // note the use of io.sockets to emit but socket.on to listen
    socket.on('disconnect', function (data) {
        console.log("disconnected");
    });
});

//Require databases in other files
const db = require('./database');

//Imported from other folders - implement all server functionality
require('./config/passport')(passport, db);
require('./config/express')(app, passport, db.pool);
require('./config/routes')(app, passport, db);

// module.exports = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = server.listen(PORT, () => console.log(`Listening on ${PORT}`));

