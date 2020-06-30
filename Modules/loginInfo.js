//loginInfo.js
//Started by Oliver Xie, June 29
//Handle user interactions with the database

//For now, the table will be called "users" with columns:
//Email
//Salt of password (plaintext)
//Hashed password + salt

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
let mainPassRegex = /[\w|\~|\`|\!|\@|\#|\$|\%|\^|\*|\(|\)|\-|\{|\}|\[|\]|\'|\,|\.|\/|\\|:]{8, }/;
let uppercaseRegex = /[A-Z]/g;
let lowercaseRegex = /[a-z]/g;
let numberRegex = /[0-9]/g;

//Verify that all the regexes are satisfied
