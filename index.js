//Dependencies
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

//Can move database to another file, as needed
const { Pool } = require('pg');

//Imported from other folders


let app = express();

//utilities
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//paths
//login path
//Landing page path
//etc.

app.get('/login', (req,res) => {
    // res.send("Hello World!");
    res.render('pages/login');
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));