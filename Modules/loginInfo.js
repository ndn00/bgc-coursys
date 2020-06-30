//loginInfo.js
//Started by Oliver Xie, June 29
//Handle user interactions with the database

//For now, the table will be called "users" with columns:
//Email
//Salt of password (plaintext)
//Hashed password + salt
//User type (organizer or attendee)

//Setup - dependencies
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

//will be merged into a single database with multiple tables
const userDatabase = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.LOCALDATABASE,
});

userDatabase.connect();

//Workflow
//Process email and password fields
//Email: match the following regex
let emailRegex = /[^(@|\s)]+@bgcengineering.ca/;

//Passwords: need to be at least length 8
//Contain at least 1 uppercase letter
//Contain at least 1 lowercase letter
//Contain at least 1 number
//Special characters are allowed
//Special characters supported by Microsoft Active Directory:
//@, %, +, \, /, ', !, #, $, ^, ?, :, ,, (, ), {, }, [, ], ~, `, -, _, .
let mainPassRegex = /[\w|\~|\`|\!|\@|\#|\$|\%|\^|\*|\(|\)|\-|\{|\}|\[|\]|\'|\,|\.|\/|\\|:]{8,}/;
let uppercaseRegex = /[A-Z]/g;
let lowercaseRegex = /[a-z]/g;
let numberRegex = /[0-9]/g;

//Verify that all the regexes are satisfied
//If not, let client know

//Verify that email is stored in the database
//If not, let client know

//Password check:
//Take salt
//Append salt to password
//Hash password + salt
//Verify that value matches that of hashed value

//Authentication error: Invalid email or password

//authenticate function - used by index.js
const authenticate = (request, response) => {

}

//User creation function
const createUser = (request, response) => {
  //Verify regexes
  let userEmail = request.body.uname.match(emailRegex);
  let mainPassCheck = request.body.pwd.match(mainPassRegex);
  let uppercaseCheck = request.body.pwd.match(uppercaseRegex);
  let lowercaseCheck = request.body.pwd.match(lowercaseRegex);
  let numberCheck = request.body.pwd.match(numberRegex);

  let errors = [];
  if (userEmail === null) {
    errors.push("Email has invalid form. (emailaddress)@bgcengineering.ca");
  }
  if (mainPassCheck === null || uppercaseCheck === null || lowercaseCheck === null || numberCheck === null) {
    errors.push("Password needs to be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.")
  }
  if (errors.length > 0) {
    response.json(errors);
  }
  else {
    //check for existing email
    userDatabase.query('SELECT email FROM users WHERE email=$1;', userEmail, (error, dbres) => {
      if (error) {
        response.status(500).json("Database error - select email");
      }
      else if (dbres.rows[0] !== undefined) {
        response.status(400).json("Database error - email already exists");
      }
    });
    //generate salt and hash (password + salt)
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(mainPassCheck[0], salt, 10000, 512, 'sha512').toString('hex');
    userDatabase.query('INSERT INTO users VALUES ($1, $2, $3);', [userEmail[0], salt, hash], (error, dbres) => {
      if (error) {
        response.status(500).json("Database error - could not insert user");
      }
      response.status(200).json("Success - user successfully added to system");
    })
  }
}
