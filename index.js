//Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//Require databases in other files

//Imported from other folders
const loginInfo = require('./loginInfo');

let app = express();

//utilities
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//paths
//login path
//Landing page path
//etc.

app.get('/login', (req,res) => {
    // res.send("Hello World!");
    res.render('pages/login');
});
app.get('/signup', (req,res) => {
    res.render('pages/signUp');
});
app.post('/login', loginInfo.authenticate);
app.post('/newuser', loginInfor.createUser);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
