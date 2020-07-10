//test.js
//non-UI tests

let chai = require('chai');
let chaiHTTP = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHTTP);

describe('login', function() {
  //3 second timeout
  this.timeout(3000);


  it('should render a page when /login is accessed', function(done) {
    chai.request(server)
      .get('/login')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash when email is blank, password is filled in', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': '', 'pwd': '11111111aA'})
      .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
      });
  });
  it('should not crash when email is non-blank, password is blank', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'hg@bgcengineering.ca', 'pwd': ''})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash when email is blank and password is blank', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': '', 'pwd': ''})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash when email is valid and password is incorrect', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'hg@bgcengineering.ca', 'pwd': 'sldkfhs234A'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash when email is incorrect and password matches that of a known user', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'sdfo45d@bgcengineering.ca', 'pwd': '11111111aA'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash when email is not formatted properly', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'manualTestingIsTheWay', 'pwd': 'sdfsd'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash as an organizer with correct email, password', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'test-organizer@bgcengineering.ca', 'pwd': 'teamBPtestpassword1'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });
  it('should not crash as an attendee with correct email, password', function(done) {
    chai.request(server)
      .post('/login')
      .send({'uname': 'hg@bgcengineering.ca', 'pwd': '11111111aA'})
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });


});
